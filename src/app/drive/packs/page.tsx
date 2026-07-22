"use client";

import Link from "next/link";
import { DriveLayout } from "@/components/drive/drive-layout";
import { DRIVE_PACKS } from "@/lib/drive/config";

function formatPrice(amount: number) {
  const whole = Math.floor(amount);
  return { whole: `$${whole}`, cents: ".00" };
}

export default function DrivePacksPage() {
  return (
    <DriveLayout shell="detail">
      <p className="drive-section-label drive-section-label--caps">Choose your pack</p>

      <div className="drive-packs">
        {DRIVE_PACKS.map((pack) => {
          const price = formatPrice(pack.price);
          return (
            <Link
              key={pack.id}
              href={`/drive?instructors=1&pack=${pack.id}`}
              className={`drive-pack-card${pack.featured ? " drive-pack-card--featured" : ""}`}
            >
              {pack.ribbon ? (
                <span className="drive-pack-card__ribbon">{pack.ribbon}</span>
              ) : null}
              <div className="drive-pack-card__body">
                <h2>{pack.title}</h2>
                <p className="drive-pack-card__hours">{pack.hours}</p>
                <div className="drive-pack-card__badges">
                  {pack.badges.map((badge) => (
                    <span
                      key={badge.label}
                      className={`drive-badge drive-badge--${badge.variant}`}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
                <div className="drive-pack-card__pricing">
                  <span className="drive-pack-card__price">
                    {price.whole}
                    <small>{price.cents}</small>
                  </span>
                  {pack.originalPrice ? (
                    <span className="drive-pack-card__was">${pack.originalPrice}</span>
                  ) : null}
                </div>
                <p className="drive-pack-card__rate">
                  {pack.rateLabel}
                  {pack.saveLabel ? (
                    <span className="drive-pack-card__save"> · {pack.saveLabel}</span>
                  ) : null}
                </p>
              </div>
              <span className="drive-pack-card__chevron">›</span>
            </Link>
          );
        })}
      </div>

      <div className="drive-social-proof">
        <span className="drive-social-proof__stars" aria-hidden>
          ★★★★★
        </span>
        <p>
          <strong>4.7 / 5</strong>
          <span> · Over 18,000 student reviews</span>
        </p>
      </div>
    </DriveLayout>
  );
}
