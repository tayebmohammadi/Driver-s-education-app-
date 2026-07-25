"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { formatDistanceMiles } from "@/lib/drive/geo-utils";
import type { SacramentoInstructorPin } from "@/lib/drive/sacramento-map";
import "leaflet/dist/leaflet.css";

const MAP_HEIGHTS = {
  preview: 280,
  full: 420,
} as const;
const NEARBY_RADIUS_M = 8000;
const PIN_COLOR = "#6b4eff";
const PIN_COLOR_SELECTED = "#5538ee";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function instructorMarkerHtml(
  pin: SacramentoInstructorPin,
  selected: boolean
): string {
  const fill = selected ? PIN_COLOR_SELECTED : PIN_COLOR;
  const inner = pin.rank
    ? `<span class="drive-map-marker__num">${pin.rank}</span>`
    : `<span class="drive-map-marker__car">🚗</span>`;

  return `<div class="drive-map-marker drive-map-marker--instructor${
    selected ? " is-selected" : ""
  }${pin.rank === 1 ? " is-closest" : ""}">
    <svg viewBox="0 0 36 44" width="32" height="40" aria-hidden="true">
      <path fill="${fill}" stroke="#fff" stroke-width="1.5" d="M18 1.5C10.4 1.5 4.5 7.4 4.5 15c0 7.2 11.2 24.2 13.1 27.2.4.7 1.4.7 1.8 0 1.9-3 13.1-20 13.1-27.2 0-7.6-6.1-13.5-13.5-13.5z"/>
      <circle fill="#fff" cx="18" cy="15" r="10"/>
    </svg>
    <div class="drive-map-marker__inner">${inner}</div>
  </div>`;
}

function createInstructorIcon(pin: SacramentoInstructorPin, selected: boolean) {
  return L.divIcon({
    className: "drive-leaflet-icon",
    html: instructorMarkerHtml(pin, selected),
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -42],
  });
}

function createUserIcon() {
  return L.divIcon({
    className: "drive-leaflet-icon",
    html: `<div class="drive-map-marker drive-map-marker--you">
      <span class="drive-map-marker__halo"></span>
      <span class="drive-map-marker__core"></span>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
  });
}

function safeInvalidateSize(map: L.Map | null | undefined): void {
  if (!map) return;

  try {
    const container = map.getContainer();
    if (!container.isConnected) return;
    map.invalidateSize({ pan: false });
  } catch {
    // Map was removed or the container is no longer in the DOM.
  }
}

export interface UserMapLocation {
  lat: number;
  lng: number;
  label?: string;
}

type InteractiveInstructorMapProps = {
  pins: SacramentoInstructorPin[];
  variant?: "preview" | "full";
  selectedInstructorId?: string;
  addressQuery?: string;
  userLocation?: UserMapLocation | null;
  instructorCount?: number;
};

export function InteractiveInstructorMap({
  pins,
  variant = "full",
  selectedInstructorId,
  addressQuery,
  userLocation,
  instructorCount,
}: InteractiveInstructorMapProps) {
  const mapHeight = MAP_HEIGHTS[variant ?? "full"];
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const radiusLayerRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    const map = L.map(container, {
      center: userLocation
        ? [userLocation.lat, userLocation.lng]
        : [38.58, -121.42],
      zoom: userLocation ? 11 : 10,
      scrollWheelZoom: true,
      zoomControl: false,
      attributionControl: true,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }
    ).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    const resize = () => safeInvalidateSize(mapRef.current);
    resize();
    const t1 = window.setTimeout(resize, 100);
    const t2 = window.setTimeout(resize, 500);
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      observer.disconnect();
      radiusLayerRef.current?.remove();
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
      radiusLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();
    radiusLayerRef.current?.remove();
    radiusLayerRef.current = null;

    const bounds = L.latLngBounds([]);

    if (userLocation) {
      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: createUserIcon(),
        zIndexOffset: 1000,
      });
      userMarker.bindPopup(
        `<div class="drive-map-popup drive-map-popup--you"><strong>Your location</strong><p>${escapeHtml(userLocation.label ?? "Meeting point")}</p></div>`,
        { className: "drive-leaflet-popup", maxWidth: 240 }
      );
      userMarker.addTo(layer);
      bounds.extend([userLocation.lat, userLocation.lng]);

      const circle = L.circle([userLocation.lat, userLocation.lng], {
        radius: NEARBY_RADIUS_M,
        color: "#4285F4",
        weight: 1.5,
        opacity: 0.35,
        fillColor: "#4285F4",
        fillOpacity: 0.1,
      });
      circle.addTo(map);
      radiusLayerRef.current = circle;
    }

    pins.forEach((pin) => {
      const selected = selectedInstructorId === pin.instructorId;
      const marker = L.marker([pin.lat, pin.lng], {
        icon: createInstructorIcon(pin, selected),
        title: pin.name,
        zIndexOffset: selected ? 500 : pin.rank === 1 ? 400 : 0,
      });

      const profileHref = addressQuery
        ? `/drive/instructors/${pin.instructorId}?address=${encodeURIComponent(addressQuery)}`
        : `/drive/instructors/${pin.instructorId}`;

      const distLine =
        pin.distanceKm !== undefined
          ? `<span class="drive-map-popup__dist">${formatDistanceMiles(pin.distanceKm)} away</span>`
          : "";

      const photoLine = pin.photoUrl
        ? `<img class="drive-map-popup__photo" src="${escapeHtml(pin.photoUrl)}" alt="" />`
        : "";

      marker.bindPopup(
        `<div class="drive-map-popup">
          <div class="drive-map-popup__head">${photoLine}<div><strong>${escapeHtml(pin.name)}</strong><p>Sample instructor</p><p class="drive-map-popup__school">${escapeHtml(pin.drivingSchoolName)}</p><p>${escapeHtml(pin.area)}</p></div></div>
          <div class="drive-map-popup__meta"><span>Sample rating ★ ${pin.rating.toFixed(1)}</span><span>${pin.transmission}</span>${pin.hourlyRate ? `<span>Sample $${pin.hourlyRate}/hr</span>` : ""}${distLine}</div>
          <a class="drive-map-popup__btn" href="${profileHref}">View preview</a>
        </div>`,
        { className: "drive-leaflet-popup", maxWidth: 260 }
      );

      marker.addTo(layer);
      bounds.extend([pin.lat, pin.lng]);
    });

    if (bounds.isValid()) {
      try {
        map.fitBounds(bounds, {
          padding: [48, 48],
          maxZoom: userLocation ? 13 : 12,
        });
      } catch {
        // Map was removed before bounds could be applied.
      }
    }

    const timeoutId = window.setTimeout(
      () => safeInvalidateSize(mapRef.current),
      80
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [pins, selectedInstructorId, addressQuery, userLocation]);

  const count = instructorCount ?? pins.length;

  return (
    <div className="drive-map-shell">
      <div className="drive-map-shell__top">
        {userLocation ? (
          <span className="drive-map-chip drive-map-chip--you">📍 You</span>
        ) : (
          <span className="drive-map-chip">Sacramento area</span>
        )}
        <span className="drive-map-chip drive-map-chip--muted">
          {count} instructors
        </span>
      </div>
      <div
        ref={containerRef}
        className="drive-sacramento-map__canvas"
        style={{ height: mapHeight, width: "100%" }}
      />
    </div>
  );
}
