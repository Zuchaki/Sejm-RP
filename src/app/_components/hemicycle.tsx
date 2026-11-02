import { Text } from '@/components/ui/text';

const TOTAL_SEATS = 460;
const ROWS = 12;
const INNER_RADIUS = 0.4;
const OUTER_RADIUS = 200;
const CENTER_X = 210;
const CENTER_Y = 206;
const SEAT_RADIUS = 4.6;

// Illustrative split of the 10th term, ordered left to right as seated in the chamber
const CLUBS = [
  { name: 'Lewica', seats: 26, fill: 'fill-party-lewica', dot: 'bg-party-lewica' },
  { name: 'Koalicja Obywatelska', seats: 157, fill: 'fill-party-ko', dot: 'bg-party-ko' },
  { name: 'Polska 2050', seats: 31, fill: 'fill-party-polska-2050', dot: 'bg-party-polska-2050' },
  { name: 'PSL', seats: 32, fill: 'fill-party-psl', dot: 'bg-party-psl' },
  {
    name: 'Niezrzeszeni',
    seats: 7,
    fill: 'fill-party-niezrzeszeni',
    dot: 'bg-party-niezrzeszeni',
  },
  { name: 'PiS', seats: 189, fill: 'fill-party-pis', dot: 'bg-party-pis' },
  {
    name: 'Konfederacja',
    seats: 18,
    fill: 'fill-party-konfederacja',
    dot: 'bg-party-konfederacja',
  },
];

/**
 * Lays out seats on concentric arcs, sorted from the left side of the chamber to the right.
 * @returns Seat positions with their polar angle.
 */
const buildSeats = () => {
  const radii = Array.from(
    { length: ROWS },
    (_, row) => INNER_RADIUS + ((1 - INNER_RADIUS) * row) / (ROWS - 1),
  );
  const radiiSum = radii.reduce((sum, radius) => sum + radius, 0);
  const seatsPerRow = radii.map((radius) => Math.round((TOTAL_SEATS * radius) / radiiSum));
  const assigned = seatsPerRow.reduce((sum, count) => sum + count, 0);
  seatsPerRow[ROWS - 1] = (seatsPerRow[ROWS - 1] ?? 0) + TOTAL_SEATS - assigned;

  return radii
    .flatMap((radius, row) => {
      const count = seatsPerRow[row] ?? 0;

      return Array.from({ length: count }, (_, index) => {
        const angle = Math.PI * (1 - index / (count - 1));

        return {
          angle,
          x: CENTER_X + OUTER_RADIUS * radius * Math.cos(angle),
          y: CENTER_Y - OUTER_RADIUS * radius * Math.sin(angle),
        };
      });
    })
    .toSorted((a, b) => b.angle - a.angle);
};

const SEAT_FILLS = CLUBS.flatMap((club) => Array.from({ length: club.seats }, () => club.fill));

export const Hemicycle = () => {
  const seats = buildSeats();

  return (
    <figure className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <Text as="h2" variant="h3">
          Sala posiedzeń
        </Text>
        <Text as="span" variant="caption" className="text-neutral-500">
          {TOTAL_SEATS} miejsc
        </Text>
      </div>

      <svg viewBox="0 0 420 214" className="mt-6 w-full">
        <title>Schemat sali posiedzeń Sejmu z miejscami w kolorach klubów</title>
        {seats.map((seat, index) => (
          <circle
            key={`${seat.x}-${seat.y}`}
            cx={seat.x}
            cy={seat.y}
            r={SEAT_RADIUS}
            className={SEAT_FILLS[index]}
          />
        ))}
      </svg>

      <figcaption className="mt-6 flex flex-col gap-4">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {CLUBS.map((club) => (
            <li key={club.name} className="flex items-center gap-2">
              <span className={`size-2.5 rounded-full ${club.dot}`} />
              <Text as="span" variant="body-sm" className="text-neutral-700">
                {club.name}
              </Text>
            </li>
          ))}
        </ul>
        <Text variant="caption" className="text-neutral-500">
          Rozkład poglądowy — docelowo dane będą pobierane na żywo z API Sejmu.
        </Text>
      </figcaption>
    </figure>
  );
};
