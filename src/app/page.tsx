import Image from 'next/image';
import { cn } from 'tailwind-variants';
import {
  ParliamentChamber,
  ParliamentChamberDeputy,
} from '@/components/ui/parliament-chamber/parliament-chamber';
import { envoyPhotos } from '@/data/envoy-photos';
import seatAssignments from '@/data/seat-assignments.json';
import { getEnvoys } from '@/services/envoys';
import { clubStyles } from '@/utils/ClubColors';
import { ClubLegend } from './_components/club-legend';
import { FeaturesSection } from './_components/features-section';
import { HeroSection } from './_components/hero-section';

export const revalidate = 86_400;

export default async function HomePage() {
  const envoysData = await getEnvoys();

  const seatedEnvoys = envoysData.flatMap((envoy) => {
    const seatId = seatAssignments.find(({ envoyId }) => envoyId === envoy.id)?.seatId;

    return seatId === undefined ? [] : [{ ...envoy, seatId }];
  });

  const envoys = seatedEnvoys.map((envoy) => ({
    ...envoy,
    envoyPhoto: envoyPhotos.find(({ envoyId }) => envoyId === envoy.id),
  }));

  return (
    <>
      <HeroSection />
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <ParliamentChamber>
          {envoys.map((envoy) => (
            <ParliamentChamberDeputy
              key={envoy.seatId}
              seatId={envoy.seatId}
              className={cn(
                'border-2 border-party-niezrzeszeni',
                clubStyles[envoy.club]?.dotClassName,
                clubStyles[envoy.club]?.borderClassName,
              )}
            >
              {envoy.envoyPhoto && (
                <Image
                  src={envoy.envoyPhoto.staticImage}
                  alt={envoy.firstLastName}
                  fill
                  placeholder="blur"
                  blurDataURL={envoy.envoyPhoto.blurPlaceholderImage}
                  sizes="48px"
                  className="object-cover hover:hidden"
                />
              )}
            </ParliamentChamberDeputy>
          ))}
        </ParliamentChamber>
        <ClubLegend clubs={envoys.map((envoy) => envoy.club)} />
      </section>
      <FeaturesSection />
    </>
  );
}
