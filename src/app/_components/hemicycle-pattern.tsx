const CENTER_X = 400;
const BASELINE_Y = 400;
const ROW_RADII = [200, 240, 280, 320, 360];

export const HemicyclePattern = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 800 400" fill="none" className={className} aria-hidden>
    {ROW_RADII.map((radius) => (
      <path
        key={radius}
        d={`M ${CENTER_X - radius} ${BASELINE_Y} A ${radius} ${radius} 0 0 1 ${CENTER_X + radius} ${BASELINE_Y}`}
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray="0 16"
      />
    ))}
  </svg>
);
