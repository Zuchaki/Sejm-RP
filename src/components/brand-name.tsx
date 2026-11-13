import { Text } from '@/components/ui/text';

export const BrandName = () => (
  <span className="flex flex-col border-l border-neutral-200 pl-3">
    <Text as="span" variant="button" className="text-neutral-900">
      Sejmrp.pl
    </Text>
    <Text as="span" variant="caption" className="text-neutral-500">
      Nieoficjalny projekt hobbystyczny
    </Text>
  </span>
);
