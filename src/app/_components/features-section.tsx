import { ChartColumn, LayoutGrid, Users, Vote } from 'lucide-react';
import { Text } from '@/components/ui/text';

const FEATURES = [
  {
    icon: LayoutGrid,
    title: 'Mapa sali posiedzeń',
    description: 'Zobacz, gdzie siedzi każdy poseł i jak rozkładają się kluby na sali plenarnej.',
  },
  {
    icon: Users,
    title: 'Profile posłów',
    description: 'Okręg, klub, komisje i aktywność — najważniejsze informacje o każdym pośle.',
  },
  {
    icon: Vote,
    title: 'Głosowania',
    description: 'Wyniki głosowań z podziałem na kluby i indywidualne decyzje posłów.',
  },
  {
    icon: ChartColumn,
    title: 'Statystyki',
    description: 'Frekwencja, zgodność z klubem i aktywność w przejrzystych zestawieniach.',
  },
];

export const FeaturesSection = () => (
  <section id="funkcje" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
    <div className="max-w-2xl">
      <Text as="span" variant="caption" className="tracking-wide text-primary-700 uppercase">
        Funkcje
      </Text>
      <Text as="h2" variant="h2" className="mt-2">
        Co znajdziesz w aplikacji
      </Text>
      <Text className="mt-3 text-neutral-600">
        Pracujemy nad pierwszymi modułami. Oto, co pojawi się wkrótce.
      </Text>
    </div>

    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map((feature) => (
        <li
          key={feature.title}
          className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
            <feature.icon className="size-5" aria-hidden />
          </span>
          <Text as="h3" variant="h3" className="mt-5">
            {feature.title}
          </Text>
          <Text variant="body-sm" className="mt-2 grow text-neutral-600">
            {feature.description}
          </Text>
          <Text
            as="span"
            variant="caption"
            className="mt-5 self-start rounded-full bg-secondary-orange-50 px-2.5 py-1 text-secondary-orange-700"
          >
            Wkrótce
          </Text>
        </li>
      ))}
    </ul>
  </section>
);
