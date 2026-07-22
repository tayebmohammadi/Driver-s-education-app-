import type { DiagramKind } from "@/lib/learning/series-study-content";

interface Props {
  kind: DiagramKind;
  title: string;
  caption: string;
}

function Canvas({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <svg viewBox="0 0 360 220" className="study-diagram__svg" role="img" aria-label={title}>
      <defs>
        <marker id="diagArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill={MUTED} />
        </marker>
      </defs>
      <rect width="360" height="220" fill="#f8fafc" rx="8" />
      {children}
    </svg>
  );
}

export function SeriesRoadDiagram({ kind, title, caption }: Props) {
  return (
    <div className="study-diagram">
      <div className="study-diagram__canvas">{renderDiagram(kind, title)}</div>
      <p className="study-diagram__caption">{caption}</p>
    </div>
  );
}

const ROAD = "#94a3b8";
const ROAD_DARK = "#64748b";
const INK = "#0f172a";
const MUTED = "#64748b";
const ACCENT = "#2563eb";
const LINE = "#cbd5e1";

function renderDiagram(kind: DiagramKind, title: string) {
  switch (kind) {
    case "four-way-stop":
      return <FourWayStop title={title} />;
    case "dmv-test-flow":
      return <DmvTestFlow title={title} />;
    case "permit-journey":
      return <PermitJourney title={title} />;
    case "traffic-signs":
      return <TrafficSigns title={title} />;
    case "left-turn-yield":
      return <LeftTurnYield title={title} />;
    case "lane-change":
      return <LaneChange title={title} />;
    case "parallel-park":
      return <ParallelPark title={title} />;
    case "traffic-signal":
      return <TrafficSignal title={title} />;
    case "speed-zone":
      return <SpeedZone title={title} />;
    case "freeway-merge":
      return <FreewayMerge title={title} />;
    case "crosswalk":
      return <Crosswalk title={title} />;
    case "stop-sign":
      return <StopSign title={title} />;
    case "curb-colors":
      return <CurbColors title={title} />;
    case "railroad":
      return <Railroad title={title} />;
    default:
      return <FourWayStop title={title} />;
  }
}

function Car({ x, y, color, label }: { x: number; y: number; color: string; label?: string }) {
  return (
    <g>
      <rect x={x} y={y + 2} width="28" height="16" rx="4" fill={color} />
      <rect x={x + 4} y={y} width="20" height="9" rx="3" fill={color} opacity="0.85" />
      {label ? (
        <text x={x + 14} y={y - 4} textAnchor="middle" fill={color} fontSize="8" fontWeight="700">
          {label}
        </text>
      ) : null}
    </g>
  );
}

function FlowBox({
  x,
  y,
  w,
  h,
  num,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  num: number;
  label: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 26} textAnchor="middle" fill={MUTED} fontSize="11" fontWeight="600">
        {num}
      </text>
      <text x={x + w / 2} y={y + h - 16} textAnchor="middle" fill={INK} fontSize="9" fontWeight="500">
        {label}
      </text>
    </g>
  );
}

function DmvTestFlow({ title }: { title: string }) {
  const steps = ["Vision", "Knowledge", "Practice", "Drive test"];
  return (
    <Canvas title={title}>
      <text x="180" y="28" textAnchor="middle" fill={MUTED} fontSize="10" fontWeight="600">
        California DMV testing path
      </text>
      {steps.map((label, i) => (
        <g key={label}>
          <FlowBox x={20 + i * 86} y={50} w={76} h={72} num={i + 1} label={label} />
          {i < steps.length - 1 ? (
            <path
              d={`M ${96 + i * 86} 86 L ${106 + i * 86} 86`}
              stroke={LINE}
              strokeWidth="1.5"
              markerEnd="url(#diagArrow)"
            />
          ) : null}
        </g>
      ))}
      <rect x="40" y="150" width="280" height="44" rx="8" fill="#fff" stroke={LINE} />
      <text x="180" y="170" textAnchor="middle" fill={MUTED} fontSize="9" fontWeight="500">
        Bring ID, forms &amp; appointment confirmation
      </text>
      <text x="180" y="184" textAnchor="middle" fill={MUTED} fontSize="8">
        Missing documents = rescheduled visit
      </text>
    </Canvas>
  );
}

function PermitJourney({ title }: { title: string }) {
  return (
    <Canvas title={title}>
      <FlowBox x={24} y={55} w={70} h={70} num={1} label="Driver ed" />
      <FlowBox x={108} y={55} w={70} h={70} num={2} label="Permit" />
      <FlowBox x={192} y={55} w={70} h={70} num={3} label="Practice" />
      <FlowBox x={276} y={55} w={70} h={70} num={4} label="License" />
      <path d="M 94 90 L 108 90" stroke={LINE} strokeWidth="1.5" markerEnd="url(#diagArrow)" />
      <path d="M 178 90 L 192 90" stroke={LINE} strokeWidth="1.5" markerEnd="url(#diagArrow)" />
      <path d="M 262 90 L 276 90" stroke={LINE} strokeWidth="1.5" markerEnd="url(#diagArrow)" />
      <text x="180" y="165" textAnchor="middle" fill={MUTED} fontSize="9">
        Each step requires completing the one before it
      </text>
    </Canvas>
  );
}

function TrafficSigns({ title }: { title: string }) {
  return (
    <Canvas title={title}>
      <g transform="translate(50 50)">
        <polygon points="30,0 60,0 72,30 60,60 30,60 18,30" fill="#475569" />
        <text x="45" y="36" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">
          STOP
        </text>
        <text x="45" y="82" textAnchor="middle" fill={MUTED} fontSize="8" fontWeight="500">
          Octagon
        </text>
      </g>
      <g transform="translate(155 55)">
        <polygon points="35,0 70,55 0,55" fill="#fff" stroke={INK} strokeWidth="2" />
        <text x="35" y="75" textAnchor="middle" fill={MUTED} fontSize="8" fontWeight="500">
          Triangle
        </text>
      </g>
      <g transform="translate(250 48)">
        <rect x="0" y="0" width="56" height="56" rx="6" fill="#fff" stroke={INK} strokeWidth="1.5" />
        <text x="28" y="36" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">
          35
        </text>
        <text x="28" y="78" textAnchor="middle" fill={MUTED} fontSize="8" fontWeight="500">
          Rectangle
        </text>
      </g>
      <text x="180" y="175" textAnchor="middle" fill={MUTED} fontSize="9">
        Shape tells you the sign type before you read the words
      </text>
    </Canvas>
  );
}

function FourWayStop({ title }: { title: string }) {
  return (
    <Canvas title={title}>
      <rect x="140" y="0" width="80" height="220" fill={ROAD} />
      <rect x="0" y="92" width="360" height="36" fill={ROAD} />
      <line x1="180" y1="0" x2="180" y2="220" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="8 6" />
      <line x1="0" y1="110" x2="360" y2="110" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="8 6" />
      <Car x={156} y={58} color={ACCENT} label="YOU" />
      <Car x={236} y={96} color={ROAD_DARK} label="RIGHT" />
      <path d="M 250 110 L 250 50" stroke={ROAD_DARK} strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#diagArrow)" />
      <text x="180" y="112" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="600">
        YIELD RIGHT
      </text>
    </Canvas>
  );
}

function LeftTurnYield({ title }: { title: string }) {
  return (
    <Canvas title={title}>
      <rect x="0" y="95" width="360" height="30" fill={ROAD} />
      <Car x={50} y={78} color={ROAD_DARK} label="ONCOMING" />
      <Car x={200} y={118} color={ACCENT} label="YOU" />
      <path d="M 78 85 L 170 85" stroke={ROAD_DARK} strokeWidth="2" strokeDasharray="5 3" />
      <path d="M 214 118 Q 180 95 160 85" stroke={ACCENT} strokeWidth="2" strokeDasharray="4 3" fill="none" opacity="0.5" />
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={i} x={120 + i * 18} y="118" width="10" height="16" fill="#fff" />
      ))}
      <text x="180" y="175" textAnchor="middle" fill={MUTED} fontSize="9" fontWeight="500">
        Wait for gap — pedestrians &amp; oncoming traffic first
      </text>
    </Canvas>
  );
}

function LaneChange({ title }: { title: string }) {
  return (
    <Canvas title={title}>
      <rect x="0" y="75" width="360" height="70" fill={ROAD} />
      <line x1="0" y1="110" x2="360" y2="110" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="10 8" />
      <Car x={40} y={118} color={ACCENT} />
      <path d="M 68 125 Q 150 88 230 88" stroke={ACCENT} strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#diagArrow)" fill="none" />
      <text x="260" y="72" fill={MUTED} fontSize="9" fontWeight="500">
        1 Signal · 2 Mirror · 3 Shoulder · 4 Move
      </text>
    </Canvas>
  );
}

function ParallelPark({ title }: { title: string }) {
  return (
    <Canvas title={title}>
      <rect x="0" y="105" width="360" height="45" fill={ROAD} />
      <rect x="50" y="150" width="260" height="8" fill={ROAD_DARK} rx="2" />
      <Car x={60} y={112} color={ROAD_DARK} />
      <Car x={250} y={112} color={ROAD_DARK} />
      <Car x={130} y={112} color={ACCENT} />
      <path d="M 144 126 L 165 145 L 185 145" stroke={ACCENT} strokeWidth="2" strokeDasharray="4 3" fill="none" />
      <text x="180" y="90" textAnchor="middle" fill={MUTED} fontSize="9" fontWeight="500">
        Pull alongside → back in → straighten
      </text>
    </Canvas>
  );
}

function TrafficSignal({ title }: { title: string }) {
  return (
    <Canvas title={title}>
      <rect x="130" y="0" width="100" height="220" fill={ROAD} />
      <rect x="0" y="92" width="360" height="36" fill={ROAD} />
      <rect x="262" y="35" width="28" height="78" rx="6" fill={INK} />
      <circle cx="276" cy="50" r="9" fill="#475569" />
      <circle cx="276" cy="74" r="9" fill="#64748b" />
      <circle cx="276" cy="98" r="9" fill="#94a3b8" />
      <Car x={156} y={58} color={ACCENT} />
    </Canvas>
  );
}

function SpeedZone({ title }: { title: string }) {
  return (
    <Canvas title={title}>
      <rect x="0" y="95" width="360" height="30" fill={ROAD} />
      <rect x="145" y="35" width="70" height="70" rx="8" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <text x="180" y="68" textAnchor="middle" fill={INK} fontSize="22" fontWeight="700">
        45
      </text>
      <text x="180" y="84" textAnchor="middle" fill={MUTED} fontSize="8">
        MAX
      </text>
      <rect x="30" y="155" width="90" height="32" rx="8" fill="#fff" stroke={LINE} />
      <text x="75" y="175" textAnchor="middle" fill={MUTED} fontSize="9" fontWeight="600">
        RAIN · SLOW DOWN
      </text>
      <Car x={220} y={103} color={ACCENT} />
    </Canvas>
  );
}

function FreewayMerge({ title }: { title: string }) {
  return (
    <Canvas title={title}>
      <rect x="0" y="90" width="360" height="40" fill={ROAD} />
      <path d="M 0 130 L 110 130 L 150 90 L 150 70 L 0 70 Z" fill={ROAD_DARK} />
      <line x1="0" y1="110" x2="360" y2="110" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="10 8" />
      <Car x={25} y={108} color={ACCENT} label="YOU" />
      <Car x={220} y={98} color={ROAD_DARK} />
      <Car x={280} y={98} color={ROAD_DARK} />
    </Canvas>
  );
}

function Crosswalk({ title }: { title: string }) {
  return (
    <Canvas title={title}>
      <rect x="70" y="65" width="220" height="90" fill={ROAD} />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={95 + i * 24} y="138" width="14" height="22" fill="#fff" />
      ))}
      <circle cx="180" cy="128" r="7" fill={INK} />
      <line x1="180" y1="135" x2="180" y2="152" stroke={INK} strokeWidth="2.5" />
      <Car x={110} y={82} color={ACCENT} />
    </Canvas>
  );
}

function StopSign({ title }: { title: string }) {
  return (
    <Canvas title={title}>
      <rect x="110" y="70" width="140" height="80" fill={ROAD} rx="4" />
      <polygon points="168,28 198,28 210,48 198,68 168,68 156,48" fill="#475569" />
      <text x="183" y="52" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">
        STOP
      </text>
      <line x1="130" y1="145" x2="230" y2="145" stroke="#fff" strokeWidth="4" />
      <Car x={150} y={108} color={ACCENT} />
    </Canvas>
  );
}

function CurbColors({ title }: { title: string }) {
  return (
    <Canvas title={title}>
      <rect x="0" y="105" width="360" height="40" fill={ROAD} />
      <rect x="0" y="145" width="120" height="10" fill="#475569" rx="2" />
      <rect x="120" y="145" width="120" height="10" fill="#64748b" rx="2" />
      <rect x="240" y="145" width="120" height="10" fill="#94a3b8" rx="2" />
      <text x="60" y="175" textAnchor="middle" fill={MUTED} fontSize="8" fontWeight="600">
        No stop
      </text>
      <text x="180" y="175" textAnchor="middle" fill={MUTED} fontSize="8" fontWeight="600">
        Short stop
      </text>
      <text x="300" y="175" textAnchor="middle" fill={MUTED} fontSize="8" fontWeight="600">
        Loading
      </text>
    </Canvas>
  );
}

function Railroad({ title }: { title: string }) {
  return (
    <Canvas title={title}>
      <rect x="0" y="100" width="360" height="30" fill={ROAD} />
      <line x1="0" y1="108" x2="360" y2="108" stroke={INK} strokeWidth="3" />
      <line x1="0" y1="122" x2="360" y2="122" stroke={INK} strokeWidth="3" />
      <circle cx="180" cy="78" r="16" fill={INK} stroke="#fff" strokeWidth="2" />
      <text x="180" y="83" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
        RR
      </text>
      <Car x={140} y={58} color={ACCENT} />
    </Canvas>
  );
}
