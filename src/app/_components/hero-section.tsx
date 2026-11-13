import { ChevronDown } from 'lucide-react';
import { Cormorant_Garamond } from 'next/font/google';
import Image from 'next/image';
import { cn } from 'tailwind-variants';
import FlagBanner from '@/assets/flagBanner.png';
import HerbPolski from '@/assets/herbPolski.webp';
import { Container } from '@/components/ui/container';
import { Text } from '@/components/ui/text';

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

    <Container className="relative flex flex-col items-center pt-16 pb-24 text-center sm:pt-20">
      <Image
        src={HerbPolski}
        alt="Godło Rzeczypospolitej Polskiej"
        priority
        className="h-28 w-auto drop-shadow-xl sm:h-36"
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

      <Text className="mt-8 max-w-xl text-pretty text-neutral-600 sm:text-lg">
        Interaktywna mapa sali posiedzeń, profile posłów, wyniki głosowań i statystyki — wszystko,
        czego potrzebujesz, żeby zrozumieć pracę Sejmu, w jednym miejscu.
      </Text>

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
