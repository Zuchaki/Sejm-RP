import { EllipseCurve } from 'three';

type Edge = { angle: number; gap: number };

const layout = {
  firstSeatNumber: 34,
  firstRowRadius: 70,
  distanceBetweenRows: 30.7,
  sectionCount: 4,
  seatsInFrontRows: [3, 5, 6],
  seatsInBackRows: [3, 4, 5, 5, 6, 7, 7, 7],
  wallColumn: { seatCount: 3, firstSeatOffset: 11.5, seatSpacing: 15.5 },
  sectionEdgeGap: 10,
  aisleWidth: 36,
  seatSize: 15,
  missingSeatNumbers: [61, 62, 63],
  renamedSeatNumbers: new Map([[285, 5]]),
};

const rowCount = layout.seatsInFrontRows.length + layout.seatsInBackRows.length;

const getRowRadius = (row: number) =>
  layout.firstRowRadius + (row - 1) * layout.distanceBetweenRows;

const lengthToAngleInRow = (length: number, row: number) => length / getRowRadius(row);

const placeSeatsEvenlyOnArc = (options: {
  row: number;
  seatCount: number;
  startAngle: number;
  endAngle: number;
}) => {
  const radius = getRowRadius(options.row);
  const arc = new EllipseCurve(0, 0, radius, radius, options.startAngle, options.endAngle, true);

  return Array.from({ length: options.seatCount }, (_, seatIndex) => {
    const point = arc.getPointAt(seatIndex / Math.max(options.seatCount - 1, 1));

    return { x: point.x, y: -point.y };
  });
};

const createSeatBlock = ({
  endEdge,
  firstRow,
  seatsPerRow,
  startEdge,
}: {
  firstRow: number;
  seatsPerRow: number[];
  startEdge: Edge;
  endEdge: Edge;
}) =>
  seatsPerRow.flatMap((seatCount, rowIndex) => {
    const row = firstRow + rowIndex;

    return placeSeatsEvenlyOnArc({
      row,
      seatCount,
      startAngle: startEdge.angle - lengthToAngleInRow(startEdge.gap, row),
      endAngle: endEdge.angle + lengthToAngleInRow(endEdge.gap, row),
    });
  });

const createSectionSeats = (sectionIndex: number) => {
  const sectionAngle = Math.PI / layout.sectionCount;
  const startAngle = Math.PI - sectionIndex * sectionAngle;
  const middleAngle = startAngle - sectionAngle / 2;
  const endAngle = startAngle - sectionAngle;

  const sectionEdge = (angle: number) => ({ angle, gap: layout.sectionEdgeGap });
  const aisleEdge = (angle: number) => ({ angle, gap: layout.aisleWidth / 2 });
  const firstBackRow = layout.seatsInFrontRows.length + 1;

  return [
    ...createSeatBlock({
      firstRow: 1,
      seatsPerRow: layout.seatsInFrontRows,
      startEdge: sectionEdge(startAngle),
      endEdge: sectionEdge(endAngle),
    }),
    ...createSeatBlock({
      firstRow: firstBackRow,
      seatsPerRow: layout.seatsInBackRows,
      startEdge: sectionEdge(startAngle),
      endEdge: aisleEdge(middleAngle),
    }),
    ...createSeatBlock({
      firstRow: firstBackRow,
      seatsPerRow: layout.seatsInBackRows,
      startEdge: aisleEdge(middleAngle),
      endEdge: sectionEdge(endAngle),
    }),
  ];
};

const createWallSeats = (side: 'left' | 'right') => {
  const rowsAlongWall = Array.from({ length: rowCount - 1 }, (_, index) => index + 2);
  const { seatCount, firstSeatOffset, seatSpacing } = layout.wallColumn;

  return rowsAlongWall.flatMap((row) => {
    const x = side === 'left' ? -getRowRadius(row) : getRowRadius(row);

    const column = Array.from({ length: seatCount }, (_, seatIndex) => ({
      x,
      y: firstSeatOffset + seatIndex * seatSpacing,
    }));

    return side === 'left' ? column.toReversed() : column;
  });
};

const getBoundingBox = (points: { x: number; y: number }[], padding: number) => {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const left = Math.min(...xs) - padding;
  const top = Math.min(...ys) - padding;

  return {
    left,
    top,
    width: Math.max(...xs) + padding - left,
    height: Math.max(...ys) + padding - top,
  };
};

// Seats are numbered clockwise around the chamber: left wall, sections from the left, right wall.
const positionsInNumberingOrder = [
  ...createWallSeats('left'),
  ...Array.from({ length: layout.sectionCount }, (_, index) => createSectionSeats(index)).flat(),
  ...createWallSeats('right'),
];

const seats = positionsInNumberingOrder
  .map((position, index) => ({ id: layout.firstSeatNumber + index, position }))
  .filter((seat) => !layout.missingSeatNumbers.includes(seat.id))
  .map((seat) => ({ ...seat, id: layout.renamedSeatNumbers.get(seat.id) ?? seat.id }));

export const chamberPlan = {
  seats: new Map(seats.map((seat) => [seat.id, seat])),
  seatSize: layout.seatSize,
  boundingBox: getBoundingBox(
    seats.map((seat) => seat.position),
    layout.seatSize,
  ),
};

export type ChamberPlan = typeof chamberPlan;
