import Image from 'next/image';
import Link from 'next/link';
import EagleRedWhite from '@/assets/eagleRedWhiteWithAlfa.png';
import { BrandName } from '@/components/brand-name';
import { Container } from '@/components/ui/container';

const NAV_LINKS = [
  { href: '#sejm', label: 'Sejm' },
  { href: '#funkcje', label: 'Funkcje' },
];

export const Header = () => (
  <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/85 backdrop-blur">
    <Container className="flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <Image src={EagleRedWhite} alt="" sizes="36px" className="h-9 w-auto" />
        <BrandName />
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
