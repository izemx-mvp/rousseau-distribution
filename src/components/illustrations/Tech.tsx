import { cn } from "@/lib/utils";

type Props = { className?: string | undefined; strokeWidth?: number | undefined };

const base = "none";

export function GearOutline({ className, strokeWidth = 1.2 }: Props) {
  const teeth = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 200 200" fill={base} className={cn("h-full w-full", className)} aria-hidden>
      <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="100" cy="100" r="26" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="100" cy="100" r="46" stroke="currentColor" strokeWidth={strokeWidth * 0.6} />
      {teeth.map((a) => (
        <rect
          key={a}
          x="93"
          y="20"
          width="14"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          transform={`rotate(${a} 100 100)`}
        />
      ))}
    </svg>
  );
}

export function BearingOutline({ className, strokeWidth = 1.2 }: Props) {
  const balls = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <svg viewBox="0 0 200 200" fill={base} className={cn("h-full w-full", className)} aria-hidden>
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="100" cy="100" r="24" stroke="currentColor" strokeWidth={strokeWidth} />
      {balls.map((a) => (
        <circle
          key={a}
          cx="100"
          cy="48"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          transform={`rotate(${a} 100 100)`}
        />
      ))}
    </svg>
  );
}

export function BeltOutline({ className, strokeWidth = 1.2 }: Props) {
  return (
    <svg viewBox="0 0 200 200" fill={base} className={cn("h-full w-full", className)} aria-hidden>
      <circle cx="62" cy="100" r="42" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="62" cy="100" r="14" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="148" cy="112" r="26" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="148" cy="112" r="9" stroke="currentColor" strokeWidth={strokeWidth} />
      <path
        d="M62 58 C110 48 148 70 148 86 M62 142 C110 154 148 142 148 138"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.6}
      />
      {Array.from({ length: 7 }, (_, i) => (
        <line
          key={i}
          x1={70 + i * 12}
          y1={54 + i * 1.2}
          x2={70 + i * 12}
          y2={64 + i * 1.2}
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.8}
        />
      ))}
    </svg>
  );
}

export function MotorOutline({ className, strokeWidth = 1.2 }: Props) {
  return (
    <svg viewBox="0 0 200 200" fill={base} className={cn("h-full w-full", className)} aria-hidden>
      <rect
        x="44"
        y="62"
        width="96"
        height="76"
        rx="10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {Array.from({ length: 8 }, (_, i) => (
        <line
          key={i}
          x1={54 + i * 11}
          y1="62"
          x2={54 + i * 11}
          y2="138"
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.5}
        />
      ))}
      <rect
        x="140"
        y="86"
        width="18"
        height="28"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        rx="2"
      />
      <line x1="158" y1="100" x2="182" y2="100" stroke="currentColor" strokeWidth={strokeWidth * 2} />
      <rect
        x="30"
        y="80"
        width="16"
        height="40"
        rx="3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path d="M60 138 v14 h64 v-14" stroke="currentColor" strokeWidth={strokeWidth} />
      <rect
        x="76"
        y="44"
        width="34"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

export function ChainOutline({ className, strokeWidth = 1.2 }: Props) {
  return (
    <svg viewBox="0 0 200 200" fill={base} className={cn("h-full w-full", className)} aria-hidden>
      <circle cx="100" cy="100" r="46" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="100" cy="100" r="18" stroke="currentColor" strokeWidth={strokeWidth} />
      {Array.from({ length: 14 }, (_, i) => i * (360 / 14)).map((a) => (
        <rect
          key={a}
          x="95"
          y="44"
          width="10"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          transform={`rotate(${a} 100 100)`}
        />
      ))}
      {Array.from({ length: 14 }, (_, i) => i * (360 / 14)).map((a) => (
        <circle
          key={`c${a}`}
          cx="100"
          cy="36"
          r="6"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          transform={`rotate(${a} 100 100)`}
        />
      ))}
    </svg>
  );
}

export function BlueprintOutline({ className, strokeWidth = 1.2 }: Props) {
  return (
    <svg viewBox="0 0 200 200" fill={base} className={cn("h-full w-full", className)} aria-hidden>
      <rect
        x="28"
        y="40"
        width="144"
        height="120"
        rx="6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <line x1="28" y1="64" x2="172" y2="64" stroke="currentColor" strokeWidth={strokeWidth * 0.6} />
      <circle cx="80" cy="112" r="28" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="80" cy="112" r="10" stroke="currentColor" strokeWidth={strokeWidth} />
      <line
        x1="118"
        y1="90"
        x2="156"
        y2="90"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeDasharray="4 4"
      />
      <line
        x1="118"
        y1="112"
        x2="156"
        y2="112"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeDasharray="4 4"
      />
      <line
        x1="118"
        y1="134"
        x2="156"
        y2="134"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeDasharray="4 4"
      />
    </svg>
  );
}

export const illustrations = {
  gear: GearOutline,
  bearing: BearingOutline,
  belt: BeltOutline,
  motor: MotorOutline,
  chain: ChainOutline,
  blueprint: BlueprintOutline,
} as const;

export type IllustrationName = keyof typeof illustrations;

export function Illustration({
  name,
  className,
  strokeWidth,
}: {
  name: IllustrationName;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = illustrations[name] ?? GearOutline;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}
