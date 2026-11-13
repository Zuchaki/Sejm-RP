import { ChevronDown, Info } from 'lucide-react';
import { Cormorant_Garamond } from 'next/font/google';
import Image from 'next/image';
import { cn } from 'tailwind-variants';
import EagleRedWhite from '@/assets/eagleRedWhiteWithAlfa.png';
import FlagBanner from '@/assets/flagBanner.png';
import { Container } from '@/components/ui/container';
import { Text } from '@/components/ui/text';
import { HemicyclePattern } from './hemicycle-pattern';

const displayFont = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600'],
  display: 'swap',
});

const flagClassName =
  'absolute inset-y-0 hidden w-36 object-cover -top-6 object-top mask-b-from-60% mask-b-to-100% lg:block xl:w-44';

export const HeroSection = () => (
  <section className="relative overflow-hidden">
    <Image
      src={FlagBanner}
      alt=""
      priority
      sizes="176px"
      className={cn(flagClassName, 'right-1/2 mr-80 xl:mr-88')}
    />
    <Image
      src={FlagBanner}
      alt=""
      priority
      sizes="176px"
      className={cn(flagClassName, 'left-1/2 ml-80 xl:ml-88')}
    />

    <HemicyclePattern className="absolute top-6 left-1/2 z-0 w-3xl -translate-x-1/2 mask-b-from-50% mask-b-to-100% text-neutral-300 sm:top-10" />

    <Container className="relative z-10 flex flex-col items-center pt-16 pb-24 text-center sm:pt-20">
      <Image
        src={EagleRedWhite}
        alt="Biało-czerwony orzeł w koronie"
        priority
        sizes="(min-width: 640px) 176px, 144px"
        className="h-36 w-auto sm:h-44"
      />

      <div className="mt-10 flex items-center gap-4">
        <span className="h-px w-10 bg-yellow-600/60" aria-hidden />
        <Text as="span" variant="caption" className="tracking-widest text-neutral-500 uppercase">
          X kadencja · 2023–2027
        </Text>
        <span className="h-px w-10 bg-yellow-600/60" aria-hidden />
      </div>

      <div className="mt-6 flex flex-col items-center">
        <Text
          as="h1"
          variant="h1"
          className={cn(
            displayFont.className,
            'text-6xl font-semibold tracking-tight text-neutral-900 sm:text-8xl',
          )}
        >
          Sejm
        </Text>
        <Text
          as="p"
          variant="body"
          className={cn(
            displayFont.className,
            'mt-2 text-lg font-medium tracking-widest text-neutral-600 uppercase sm:text-2xl',
          )}
        >
          Rzeczypospolitej Polskiej
        </Text>
      </div>

      <div className="mt-8 flex items-center gap-3" aria-hidden>
        <span className="h-px w-16 bg-linear-to-r from-transparent to-yellow-600/70" />
        <span className="size-2 rotate-45 bg-red-700" />
        <span className="h-px w-16 bg-linear-to-l from-transparent to-yellow-600/70" />
      </div>

      <Text variant="body-sm" className="mt-8 max-w-xl text-pretty text-neutral-600">
        Interaktywna mapa sali posiedzeń, profile posłów, wyniki głosowań i statystyki — wszystko,
        czego potrzebujesz, żeby zrozumieć pracę Sejmu, w jednym miejscu.
      </Text>

      <div className="mt-6 flex max-w-xl items-start gap-2 rounded-lg border border-yellow-600/30 bg-white px-4 py-2 text-left text-neutral-700 shadow-sm">
        <Info className="mt-0.5 size-4 shrink-0 text-yellow-700" aria-hidden />
        <Text as="p" variant="body-sm" className="text-pretty">
          <strong className="font-semibold text-neutral-900">Serwis nieoficjalny</strong>,
          niezwiązany z Kancelarią Sejmu RP. To prywatny, hobbystyczny projekt. Dane pochodzą z
          publicznego API Sejmu.
        </Text>
      </div>

      <a
        href="#funkcje"
        className="mt-14 flex flex-col items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-900"
      >
        <Text as="span" variant="caption">
          Poznaj funkcje
        </Text>
        <ChevronDown className="size-5" aria-hidden />
      </a>
    </Container>
  </section>
);
