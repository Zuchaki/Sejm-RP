import Image from 'next/image';
import { cn } from 'tailwind-variants';
import { Container } from '@/components/ui/container';
import {
  ParliamentChamber,
  ParliamentChamberDeputy,
} from '@/components/ui/parliament-chamber/parliament-chamber';
import {
  ZoomPan,
  ZoomPanContent,
  ZoomPanControls,
  ZoomPanFreeControlToggle,
  ZoomPanHint,
  ZoomPanReset,
  ZoomPanZoomIn,
  ZoomPanZoomOut,
} from '@/components/ui/zoom-pan';
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
      <Container as="section" className="pb-12">
        <ZoomPan>
          <ZoomPanContent>
            <ParliamentChamber>
              {envoys.map((envoy) => (
                <ParliamentChamberDeputy
                  key={envoy.seatId}
                  seatId={envoy.seatId}
                  className={cn(
                    'lg:border-2 border border-party-niezrzeszeni',
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
                      className="aspect-square h-full object-cover hover:hidden"
                    />
                  )}
                </ParliamentChamberDeputy>
              ))}
            </ParliamentChamber>
          </ZoomPanContent>
          <ZoomPanHint />
          <ZoomPanControls>
            <ZoomPanZoomIn />
            <ZoomPanZoomOut />
            <ZoomPanReset />
            <ZoomPanFreeControlToggle />
          </ZoomPanControls>
        </ZoomPan>
        <ClubLegend clubs={envoys.map((envoy) => envoy.club)} />
      </Container>
      <FeaturesSection />
    </>
  );
}
