"use client";

import type { MotionKind } from "@/lib/learning/series-study-content";

interface Props {
  kind: MotionKind;
}

export function SeriesMotionPreview({ kind }: Props) {
  return (
    <div className={`motion-scene motion-scene--${kind}`} aria-hidden>
      {renderScene(kind)}
    </div>
  );
}

function renderScene(kind: MotionKind) {
  switch (kind) {
    case "four-way-yield":
      return <FourWayYieldScene />;
    case "dmv-test-flow":
    case "permit-journey":
      return <FlowStepsScene variant={kind} />;
    case "signal-phases":
      return <SignalPhasesScene />;
    case "left-turn-yield":
      return <LeftTurnYieldScene />;
    case "lane-change":
      return <LaneChangeScene />;
    case "freeway-merge":
      return <FreewayMergeScene />;
    case "parallel-park":
      return <ParallelParkScene />;
    case "pedestrian-yield":
      return <PedestrianYieldScene />;
    case "sign-recognition":
      return <SignRecognitionScene />;
    case "slow-for-conditions":
      return <SlowConditionsScene />;
    default:
      return <FourWayYieldScene />;
  }
}

function FourWayYieldScene() {
  return (
    <svg viewBox="0 0 360 200" className="motion-scene__svg">
      <rect width="360" height="200" fill="#f8fafc" rx="8" />
      <rect x="150" y="0" width="60" height="200" fill="#64748b" />
      <rect x="0" y="85" width="360" height="30" fill="#64748b" />
      <rect x="145" y="80" width="70" height="4" fill="#fff" />
      <rect x="175" y="0" width="4" height="200" fill="#fff" opacity="0.5" />
      <g className="motion-scene__car motion-scene__car--you">
        <rect x="158" y="118" width="24" height="14" rx="3" fill="#2563eb" />
        <text x="170" y="110" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="600">
          YOU
        </text>
      </g>
      <g className="motion-scene__car motion-scene__car--them">
        <rect x="228" y="88" width="24" height="14" rx="3" fill="#475569" />
        <text x="240" y="80" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="600">
          RIGHT
        </text>
      </g>
      <path
        className="motion-scene__path motion-scene__path--them"
        d="M 240 102 L 240 40"
        stroke="#64748b"
        strokeWidth="2"
        strokeDasharray="4 3"
        fill="none"
      />
    </svg>
  );
}

function FlowStepsScene({ variant }: { variant: "dmv-test-flow" | "permit-journey" }) {
  const steps =
    variant === "dmv-test-flow"
      ? ["Vision", "Knowledge", "Practice", "Drive test"]
      : ["Driver ed", "Permit", "Practice", "License"];

  return (
    <svg viewBox="0 0 360 200" className="motion-scene__svg">
      <rect width="360" height="200" fill="#f8fafc" rx="8" />
      {steps.map((label, i) => {
        const x = 24 + i * 86;
        return (
          <g key={label} className={`motion-scene__step motion-scene__step--${i + 1}`}>
            <rect x={x} y="70" width="72" height="60" rx="8" fill="#fff" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x={x + 36} y="92" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600">
              {i + 1}
            </text>
            <text x={x + 36} y="118" textAnchor="middle" fill="#334155" fontSize="8" fontWeight="500">
              {label}
            </text>
            {i < steps.length - 1 ? (
              <path
                d={`M ${x + 74} 100 L ${x + 82} 100`}
                stroke="#94a3b8"
                strokeWidth="2"
                markerEnd="url(#flowArrow)"
              />
            ) : null}
          </g>
        );
      })}
      <defs>
        <marker id="flowArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#94a3b8" />
        </marker>
      </defs>
    </svg>
  );
}

function SignalPhasesScene() {
  return (
    <svg viewBox="0 0 360 200" className="motion-scene__svg">
      <rect width="360" height="200" fill="#f8fafc" rx="8" />
      <rect x="130" y="30" width="100" height="140" fill="#64748b" rx="4" />
      <rect x="248" y="50" width="28" height="80" rx="6" fill="#1e293b" />
      <circle className="motion-scene__light motion-scene__light--red" cx="262" cy="64" r="9" fill="#475569" />
      <circle className="motion-scene__light motion-scene__light--yellow" cx="262" cy="88" r="9" fill="#64748b" />
      <circle className="motion-scene__light motion-scene__light--green" cx="262" cy="112" r="9" fill="#94a3b8" />
      <g className="motion-scene__car motion-scene__car--go">
        <rect x="168" y="72" width="26" height="14" rx="3" fill="#2563eb" />
      </g>
      <text x="180" y="185" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600">
        Red → Yellow → Green
      </text>
    </svg>
  );
}

function LeftTurnYieldScene() {
  return (
    <svg viewBox="0 0 360 200" className="motion-scene__svg">
      <rect width="360" height="200" fill="#f8fafc" rx="8" />
      <rect x="0" y="88" width="360" height="28" fill="#64748b" />
      <g className="motion-scene__car motion-scene__car--oncoming">
        <rect x="60" y="78" width="26" height="14" rx="3" fill="#475569" />
        <text x="73" y="70" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="600">
          ONCOMING
        </text>
      </g>
      <g className="motion-scene__car motion-scene__car--turning">
        <rect x="200" y="118" width="26" height="14" rx="3" fill="#2563eb" />
        <text x="213" y="136" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="600">
          YOU (WAIT)
        </text>
      </g>
      <path
        className="motion-scene__path motion-scene__path--oncoming"
        d="M 86 85 L 160 85"
        stroke="#64748b"
        strokeWidth="2"
        strokeDasharray="5 3"
        fill="none"
      />
    </svg>
  );
}

function LaneChangeScene() {
  return (
    <svg viewBox="0 0 360 200" className="motion-scene__svg">
      <rect width="360" height="200" fill="#f8fafc" rx="8" />
      <rect x="0" y="80" width="360" height="50" fill="#64748b" />
      <line x1="0" y1="105" x2="360" y2="105" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="10 8" />
      <g className="motion-scene__car motion-scene__car--from">
        <rect x="50" y="112" width="26" height="14" rx="3" fill="#2563eb" />
      </g>
      <path
        className="motion-scene__path motion-scene__path--lane"
        d="M 76 119 Q 140 90 210 90"
        stroke="#2563eb"
        strokeWidth="2.5"
        strokeDasharray="5 4"
        fill="none"
      />
    </svg>
  );
}

function FreewayMergeScene() {
  return (
    <svg viewBox="0 0 360 200" className="motion-scene__svg">
      <rect width="360" height="200" fill="#f8fafc" rx="8" />
      <rect x="0" y="90" width="360" height="40" fill="#64748b" />
      <path d="M 0 130 L 120 130 L 160 90 L 160 70 L 0 70 Z" fill="#94a3b8" />
      <g className="motion-scene__car motion-scene__car--merge">
        <rect x="30" y="108" width="26" height="14" rx="3" fill="#2563eb" />
      </g>
      <rect x="220" y="98" width="26" height="14" rx="3" fill="#64748b" opacity="0.6" />
      <rect x="280" y="98" width="26" height="14" rx="3" fill="#64748b" opacity="0.6" />
    </svg>
  );
}

function ParallelParkScene() {
  return (
    <svg viewBox="0 0 360 200" className="motion-scene__svg">
      <rect width="360" height="200" fill="#f8fafc" rx="8" />
      <rect x="0" y="100" width="360" height="40" fill="#64748b" />
      <rect x="60" y="140" width="240" height="6" fill="#94a3b8" rx="2" />
      <rect x="80" y="108" width="26" height="14" rx="3" fill="#64748b" />
      <rect x="250" y="108" width="26" height="14" rx="3" fill="#64748b" />
      <g className="motion-scene__car motion-scene__car--park">
        <rect x="140" y="108" width="26" height="14" rx="3" fill="#2563eb" />
      </g>
      <path
        className="motion-scene__path motion-scene__path--park"
        d="M 153 122 L 170 138 L 188 138"
        stroke="#2563eb"
        strokeWidth="2"
        strokeDasharray="4 3"
        fill="none"
      />
    </svg>
  );
}

function PedestrianYieldScene() {
  return (
    <svg viewBox="0 0 360 200" className="motion-scene__svg">
      <rect width="360" height="200" fill="#f8fafc" rx="8" />
      <rect x="80" y="70" width="200" height="70" fill="#64748b" />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x={110 + i * 28} y="128" width="14" height="18" fill="#fff" />
      ))}
      <g className="motion-scene__ped">
        <circle cx="180" cy="118" r="6" fill="#0f172a" />
        <line x1="180" y1="124" x2="180" y2="138" stroke="#0f172a" strokeWidth="2" />
      </g>
      <rect x="120" y="88" width="26" height="14" rx="3" fill="#2563eb" />
    </svg>
  );
}

function SignRecognitionScene() {
  return (
    <svg viewBox="0 0 360 200" className="motion-scene__svg">
      <rect width="360" height="200" fill="#f8fafc" rx="8" />
      <rect x="0" y="120" width="360" height="30" fill="#64748b" />
      <g className="motion-scene__sign motion-scene__sign--stop">
        <polygon points="70,50 90,50 98,70 90,90 70,90 62,70" fill="#475569" />
        <text x="80" y="74" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="800">
          STOP
        </text>
      </g>
      <g className="motion-scene__sign motion-scene__sign--yield">
        <polygon points="180,55 200,85 160,85" fill="#fff" stroke="#334155" strokeWidth="2" />
      </g>
      <g className="motion-scene__sign motion-scene__sign--speed">
        <rect x="248" y="48" width="44" height="44" rx="4" fill="#fff" stroke="#334155" strokeWidth="2" />
        <text x="270" y="76" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="800">
          35
        </text>
      </g>
      <rect x="40" y="108" width="26" height="14" rx="3" fill="#2563eb" />
    </svg>
  );
}

function SlowConditionsScene() {
  return (
    <svg viewBox="0 0 360 200" className="motion-scene__svg">
      <rect width="360" height="200" fill="#f8fafc" rx="8" />
      <rect x="0" y="100" width="360" height="30" fill="#64748b" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1={i * 32}
          y1="60"
          x2={i * 32 + 16}
          y2="90"
          stroke="#94a3b8"
          strokeWidth="2"
          opacity="0.7"
        />
      ))}
      <g className="motion-scene__car motion-scene__car--slow">
        <rect x="140" y="108" width="26" height="14" rx="3" fill="#2563eb" />
      </g>
      <text x="180" y="165" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600">
        Rain → slow down · widen gap
      </text>
    </svg>
  );
}
