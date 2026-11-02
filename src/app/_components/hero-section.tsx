import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import HerbPolski from '@/assets/herbPolski.webp';
import { buttonStyles } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const FACTS = [
  { value: '460', label: 'posłów' },
  { value: '41', label: 'okręgów wyborczych' },
  { value: '4 lata', label: 'trwa kadencja' },
];

export const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_at_top,var(--color-primary-100),transparent_65%)]" />

    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 pt-16 pb-12 text-center sm:px-6 sm:pt-20">
      <Image
        src={HerbPolski}
        alt="Godło Rzeczypospolitej Polskiej"
        priority
        className="h-28 w-auto drop-shadow-md sm:h-32"
      />

      <Text
        as="span"
        variant="caption"
        className="mt-8 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-primary-700"
      >
        X kadencja · 2023–2027
      </Text>

      <Text as="h1" variant="h1" className="mt-5 text-balance sm:text-5xl">
        Sejm Rzeczypospolitej Polskiej
      </Text>

      <Text className="mt-5 max-w-2xl text-pretty text-neutral-600 sm:text-lg">
        Interaktywna mapa sali posiedzeń, profile posłów, wyniki głosowań i statystyki — wszystko,
        czego potrzebujesz, żeby zrozumieć pracę Sejmu, w jednym miejscu.
      </Text>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href="#funkcje" className={buttonStyles()}>
          Poznaj funkcje
          <ArrowRight className="size-4" aria-hidden />
        </a>
        <a
          href="https://www.sejm.gov.pl"
          target="_blank"
          rel="noreferrer noopener"
          className={buttonStyles({ variant: 'secondary' })}
        >
          Oficjalna strona Sejmu
          <ExternalLink className="size-4" aria-hidden />
        </a>
      </div>

      <dl className="mt-12 grid w-full grid-cols-3 divide-x divide-neutral-200 rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {FACTS.map((fact) => (
          <div key={fact.label} className="flex flex-col-reverse gap-1 px-2 py-5">
            <Text as="dt" variant="caption" className="text-neutral-500">
              {fact.label}
            </Text>
            <Text
              as="dd"
              variant="stat"
              className="text-2xl font-bold text-neutral-900 sm:text-stat"
            >
              {fact.value}
            </Text>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
