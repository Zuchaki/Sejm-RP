import { cn } from 'tailwind-variants';
import { Text } from '@/components/ui/text';
import { clubStyles } from '@/utils/ClubColors';

export const ClubLegend = (props: { clubs: string[] }) => {
  const clubCounts = Object.entries(Object.groupBy(props.clubs, (club) => club))
    .map(([club, members]) => ({ club, count: members?.length ?? 0 }))
    .toSorted((a, b) => b.count - a.count);

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        {clubCounts.map((clubCount) => (
          <li key={clubCount.club} className="flex items-center gap-2">
            <span
              className={cn(
                'size-3 rounded-full bg-party-niezrzeszeni',
                clubStyles[clubCount.club]?.dotClassName,
              )}
            />
            <Text as="span" variant="body-sm" className="text-neutral-600">
              {clubStyles[clubCount.club]?.label ?? clubCount.club}
            </Text>
            <Text as="span" variant="body-sm" className="font-semibold text-neutral-900">
              {clubCount.count}
            </Text>
          </li>
        ))}
      </ul>
      <Text variant="caption" className="text-neutral-500">
        Łącznie {props.clubs.length} posłów
      </Text>
    </div>
  );
};
