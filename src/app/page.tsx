import { cn } from 'tailwind-variants';
import { chamberPlan } from '@/components/ui/parliament-chamber/chamber-layout';
import {
  ParliamentChamber,
  ParliamentChamberDeputy,
} from '@/components/ui/parliament-chamber/parliament-chamber';
import { FeaturesSection } from './_components/features-section';
import { Hemicycle } from './_components/hemicycle';
import { HeroSection } from './_components/hero-section';

const highlightedSeatId = 268;

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <ParliamentChamber>
          {[...chamberPlan.seats.keys()].map((seatId) => (
            <ParliamentChamberDeputy
              key={seatId}
              seatId={seatId}
              className={cn('bg-red-500 hover:bg-blue-500', {
                'bg-green-600': seatId === highlightedSeatId,
              })}
            />
          ))}
        </ParliamentChamber>
      </section>
      <section id="sejm" className="mx-auto max-w-3xl scroll-mt-20 px-4 sm:px-6">
        <Hemicycle />
      </section>
      <FeaturesSection />
    </>
  );
}
