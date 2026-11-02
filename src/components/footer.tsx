import Image from 'next/image';
import HerbPolski from '@/assets/herbPolski.webp';
import { Text } from '@/components/ui/text';

export const Footer = () => (
  <footer className="border-t border-neutral-200 bg-white">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src={HerbPolski} alt="" className="h-8 w-auto" />
          <Text as="span" variant="button" className="text-neutral-900">
            Sejm RP
          </Text>
        </div>
        <Text variant="body-sm" className="text-neutral-500">
          Źródło danych:{' '}
          <a
            href="https://api.sejm.gov.pl"
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-primary-700 hover:underline"
          >
            api.sejm.gov.pl
          </a>
        </Text>
      </div>

      <div className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        <Text as="h2" variant="body-sm" className="font-semibold text-neutral-800">
          Informacja o serwisie
        </Text>
        <Text variant="body-sm" className="text-pretty text-neutral-600">
          Sejm RP nie jest stroną rządową ani oficjalnym serwisem Sejmu Rzeczypospolitej Polskiej.
          To niezależna aplikacja, niepowiązana z Kancelarią Sejmu, której celem jest ułatwienie
          śledzenia głosowań i prac Sejmu oraz przybliżenie sylwetek posłów.
        </Text>
        <Text variant="body-sm" className="text-pretty text-neutral-600">
          Prezentowane informacje mogą być nieaktualne lub zawierać błędy. Serwis nie stanowi
          oficjalnego ani wiążącego źródła informacji prawnej, w sprawach wymagających pewności
          korzystaj z{' '}
          <a
            href="https://www.sejm.gov.pl"
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-primary-700 hover:underline"
          >
            oficjalnej strony Sejmu
          </a>
          .
        </Text>
        <Text variant="body-sm" className="text-pretty text-neutral-600">
          Domena sejmrp.pl należy do osoby prywatnej i nie jest domeną rządową.
        </Text>
      </div>
    </div>
  </footer>
);
