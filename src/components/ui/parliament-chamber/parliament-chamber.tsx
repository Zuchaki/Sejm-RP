'use client';

import { createContext, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ChamberPlan } from './chamber-layout';
import { chamberPlan } from './chamber-layout';

const ParliamentChamberContext = createContext<ChamberPlan | null>(null);

const useParliamentChamber = () => {
  const plan = useContext(ParliamentChamberContext);

  if (!plan) {
    throw new Error('useParliamentChamber must be used within a <ParliamentChamber />');
  }

  return plan;
};

const toPercent = (value: number, total: number) =>
  `${Number(((value / total) * 100).toFixed(4))}%`;

const ParliamentChamber = (props: {
  plan?: ChamberPlan;
  className?: string;
  children?: React.ReactNode;
}) => {
  const plan = props.plan ?? chamberPlan;

  return (
    <ParliamentChamberContext value={plan}>
      <div
        data-slot="parliament-chamber"
        className={twMerge('relative w-full', props.className)}
        style={{ aspectRatio: plan.boundingBox.width / plan.boundingBox.height }}
      >
        {props.children}
      </div>
    </ParliamentChamberContext>
  );
};

const ParliamentChamberDeputy = (props: {
  seatId: number;
  className?: string;
  children?: React.ReactNode;
}) => {
  const plan = useParliamentChamber();
  const seat = plan.seats.get(props.seatId);

  if (!seat) {
    return null;
  }

  const box = plan.boundingBox;

  return (
    <div
      data-slot="parliament-chamber-deputy"
      data-seat-id={seat.id}
      className={twMerge(
        'absolute flex aspect-square -translate-1/2 items-center justify-center overflow-hidden rounded-full bg-neutral-300',
        props.className,
      )}
      style={{
        left: toPercent(seat.position.x - box.left, box.width),
        top: toPercent(seat.position.y - box.top, box.height),
        width: toPercent(plan.seatSize, box.width),
      }}
    >
      {props.children}
    </div>
  );
};

export { ParliamentChamber, ParliamentChamberDeputy, useParliamentChamber };
