import { Icon } from "@/components/ui/icons";
import type { ArtMotif, IconName } from "@/data/types";
import { cn } from "@/lib/cn";

const GOLD = "#e0a95e";
const GOLD_STRONG = "#f0bd76";
const TEAL = "#7fc7c4";
const LINE = "rgba(224,169,94,0.28)";
const FAINT = "rgba(244,240,233,0.10)";

/**
 * Capa ilustrada para projetos sem captura de tela.
 * Cada motivo resume visualmente a ideia do projeto (grafo, árvore DOM, benchmark…).
 */
export function ProjectArt({
  motif,
  icon,
  className,
  uid = motif,
}: {
  motif: ArtMotif;
  icon: IconName;
  className?: string;
  /** Prefixo dos ids dos gradientes (evita ids duplicados na mesma página). */
  uid?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-background-elevated bg-[radial-gradient(ellipse_at_30%_20%,rgba(224,169,94,0.16),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgba(127,199,196,0.12),transparent_55%)]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-grid mask-radial opacity-70" />
      <svg
        viewBox="0 0 400 250"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <defs>
          <linearGradient id={`gold-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={GOLD_STRONG} />
            <stop offset="100%" stopColor="#a97b3c" />
          </linearGradient>
          <linearGradient id={`teal-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a7ded9" />
            <stop offset="100%" stopColor={TEAL} />
          </linearGradient>
        </defs>
        <Motif motif={motif} uid={uid} />
      </svg>
      <span className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-xl text-accent-strong glass-strong">
        <Icon name={icon} className="h-5 w-5" />
      </span>
    </div>
  );
}

function Motif({ motif, uid }: { motif: ArtMotif; uid: string }) {
  const gold = `url(#gold-${uid})`;
  const teal = `url(#teal-${uid})`;

  switch (motif) {
    case "graph": {
      const nodes = [
        [70, 150],
        [130, 85],
        [135, 190],
        [200, 125],
        [265, 70],
        [270, 180],
        [330, 120],
      ] as const;
      const edges = [
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 3],
        [3, 4],
        [3, 5],
        [4, 6],
        [5, 6],
      ] as const;
      return (
        <g>
          <circle cx="200" cy="125" r="70" stroke={LINE} strokeDasharray="3 6" />
          <circle cx="200" cy="125" r="105" stroke={FAINT} strokeDasharray="2 8" />
          {edges.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={nodes[a][0]}
              y1={nodes[a][1]}
              x2={nodes[b][0]}
              y2={nodes[b][1]}
              stroke={LINE}
              strokeWidth="1.5"
            />
          ))}
          {nodes.map(([x, y], index) => (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={index === 3 ? 16 : 6}
              fill={index === 3 ? gold : index % 2 ? teal : GOLD}
              opacity={index === 3 ? 1 : 0.85}
            />
          ))}
        </g>
      );
    }
    case "tree": {
      return (
        <g className="font-mono" fontSize="9">
          <path d="M200 52 L120 112 M200 52 L200 112 M200 52 L280 112" stroke={LINE} strokeWidth="1.5" />
          <path d="M120 112 L88 172 M120 112 L152 172 M280 112 L312 172" stroke={LINE} strokeWidth="1.5" />
          <path d="M280 112 L248 172" stroke={TEAL} strokeWidth="1.8" />
          <path d="M200 112 L218 200" stroke={FAINT} strokeWidth="1.5" strokeDasharray="4 5" />
          <rect x="172" y="38" width="56" height="26" rx="8" fill="rgba(224,169,94,0.12)" stroke={GOLD} />
          <text x="200" y="55" textAnchor="middle" fill={GOLD_STRONG}>
            &lt;form&gt;
          </text>
          {[
            [120, 112],
            [200, 112],
            [280, 112],
            [88, 172],
            [152, 172],
            [312, 172],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="#14121a" stroke={GOLD} strokeWidth="1.5" />
          ))}
          <circle cx="248" cy="172" r="9" fill={teal} />
          <text x="248" y="196" textAnchor="middle" fill="#a7ded9">
            #input-email
          </text>
          <g transform="translate(218 205)">
            <circle r="9" fill="#14121a" stroke="rgba(244,240,233,0.25)" strokeDasharray="3 3" />
            <path
              d="M-3.5 -3.5 L3.5 3.5 M3.5 -3.5 L-3.5 3.5"
              stroke="rgba(244,240,233,0.45)"
              strokeWidth="1.5"
            />
          </g>
          <text x="186" y="232" textAnchor="middle" fill="rgba(244,240,233,0.45)">
            #email
          </text>
          <path
            d="M228 206 C 238 200, 242 192, 245 184"
            stroke={TEAL}
            strokeWidth="1.5"
            strokeDasharray="3 4"
          />
        </g>
      );
    }
    case "bars": {
      const groups = [
        [70, 120, 96],
        [104, 88, 128],
        [132, 110, 76],
        [118, 140, 104],
      ];
      return (
        <g>
          <line x1="70" y1="200" x2="340" y2="200" stroke={LINE} />
          {[80, 120, 160].map((y) => (
            <line key={y} x1="70" y1={y} x2="340" y2={y} stroke={FAINT} strokeDasharray="2 6" />
          ))}
          {groups.map((values, groupIndex) =>
            values.map((height, barIndex) => (
              <rect
                key={`${groupIndex}-${barIndex}`}
                x={86 + groupIndex * 64 + barIndex * 15}
                y={200 - height}
                width="11"
                height={height}
                rx="3"
                fill={barIndex === 0 ? gold : barIndex === 1 ? teal : "rgba(244,240,233,0.22)"}
              />
            )),
          )}
          <path d="M92 118 L156 92 L220 104 L284 66" stroke={GOLD_STRONG} strokeWidth="2" />
          {[
            [92, 118],
            [156, 92],
            [220, 104],
            [284, 66],
          ].map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="4"
              fill="#08070a"
              stroke={GOLD_STRONG}
              strokeWidth="2"
            />
          ))}
        </g>
      );
    }
    case "pipeline": {
      const stages = [60, 140, 220, 300];
      return (
        <g>
          <line x1="70" y1="125" x2="330" y2="125" stroke={LINE} strokeWidth="1.5" strokeDasharray="4 6" />
          {stages.map((x, index) => (
            <g key={x} transform={`translate(${x} 95)`}>
              <rect
                width="52"
                height="60"
                rx="12"
                fill="#14121a"
                stroke={index === stages.length - 1 ? TEAL : GOLD}
                strokeOpacity={index === stages.length - 1 ? 0.9 : 0.6}
              />
              <rect x="10" y="14" width="32" height="5" rx="2.5" fill="rgba(244,240,233,0.18)" />
              <rect x="10" y="25" width="22" height="5" rx="2.5" fill="rgba(244,240,233,0.12)" />
              <circle cx="40" cy="45" r="7" fill={index === stages.length - 1 ? teal : gold} />
              <path d="M36.5 45 L39 47.5 L43.5 42.5" stroke="#08070a" strokeWidth="1.8" fill="none" />
            </g>
          ))}
          <rect x="60" y="185" width="292" height="4" rx="2" fill={FAINT} />
          <rect x="60" y="185" width="230" height="4" rx="2" fill={gold} />
        </g>
      );
    }
    case "oracle": {
      return (
        <g className="font-mono" fontSize="9">
          <circle cx="165" cy="125" r="62" fill="rgba(224,169,94,0.10)" stroke={GOLD} strokeOpacity="0.7" />
          <circle cx="235" cy="125" r="62" fill="rgba(127,199,196,0.10)" stroke={TEAL} strokeOpacity="0.7" />
          <path d="M200 74 A 62 62 0 0 1 200 176 A 62 62 0 0 1 200 74 Z" fill="rgba(240,189,118,0.22)" />
          <circle cx="200" cy="125" r="14" fill={gold} />
          <path d="M194 125 L198.5 129.5 L207 120.5" stroke="#08070a" strokeWidth="2.2" fill="none" />
          <text x="132" y="128" textAnchor="middle" fill={GOLD_STRONG}>
            cos ≥ .85
          </text>
          <text x="270" y="128" textAnchor="middle" fill="#a7ded9">
            guardrails
          </text>
          <path d="M120 205 Q 200 175 280 205" stroke={FAINT} strokeDasharray="3 5" />
        </g>
      );
    }
    case "browser": {
      return (
        <g>
          <rect x="62" y="40" width="276" height="176" rx="14" fill="#100f14" stroke={LINE} />
          <line x1="62" y1="64" x2="338" y2="64" stroke={LINE} />
          {[78, 90, 102].map((x) => (
            <circle key={x} cx={x} cy="52" r="3.5" fill="rgba(244,240,233,0.22)" />
          ))}
          <rect x="84" y="84" width="120" height="14" rx="4" fill={gold} />
          <rect x="84" y="104" width="86" height="14" rx="4" fill={teal} opacity="0.8" />
          <rect x="84" y="128" width="140" height="5" rx="2.5" fill="rgba(244,240,233,0.16)" />
          <rect x="84" y="138" width="116" height="5" rx="2.5" fill="rgba(244,240,233,0.12)" />
          <rect x="84" y="156" width="48" height="14" rx="7" fill={GOLD} />
          <rect x="138" y="156" width="48" height="14" rx="7" stroke={LINE} />
          <rect x="246" y="82" width="70" height="88" rx="10" fill="rgba(224,169,94,0.08)" stroke={LINE} />
          <circle cx="281" cy="114" r="16" fill="rgba(224,169,94,0.25)" />
          <rect x="84" y="184" width="70" height="20" rx="6" fill="rgba(244,240,233,0.05)" stroke={FAINT} />
          <rect x="160" y="184" width="70" height="20" rx="6" fill="rgba(244,240,233,0.05)" stroke={FAINT} />
          <circle cx="318" cy="196" r="11" fill={gold} />
        </g>
      );
    }
  }
}
