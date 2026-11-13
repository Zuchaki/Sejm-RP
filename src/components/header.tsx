import Image from 'next/image';
import Link from 'next/link';
import HerbPolski from '@/assets/herbPolski.webp';
import { Container } from '@/components/ui/container';
import { Text } from '@/components/ui/text';

const NAV_LINKS = [
  { href: '#sejm', label: 'Sejm' },
  { href: '#funkcje', label: 'Funkcje' },
];

export const Header = () => (
  <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/85 backdrop-blur">
    <Container className="flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <Image src={HerbPolski} alt="Godło Rzeczypospolitej Polskiej" className="h-9 w-auto" />
        <span className="flex flex-col">
          <Text as="span" variant="button" className="text-neutral-900">
            Sejm RP
          </Text>
          <Text as="span" variant="caption" className="text-neutral-500">
            Interaktywny przewodnik
          </Text>
        </span>
      </Link>

      <nav aria-label="Nawigacja główna">
        <ul className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-button text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  </header>
);
