import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // Dependencies to ignore during analysis
  ignoreDependencies: [
    '@hookform/resolvers', // Kept for form handling, currently no form in the app uses it yet
    'react-hook-form', // Kept for form handling, currently no form in the app uses it yet
    'lefthook', // Drives git hooks via lefthook.yml + .git/hooks/*, not imported or referenced in any script
  ],
  // The lefthook plugin's usage detection is environment-dependent (installed .git/hooks locally vs none on CI),
  // so it's disabled and `ignoreDependencies` is the single source of truth.
  lefthook: false,
  // Shared UI primitives ship a full API surface; not every export is wired up yet,
  // but their imports still count towards dependency usage
  entry: ['src/components/ui/**/*.{ts,tsx}'],
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/gu)].join('\n'),
  },
  treatConfigHintsAsErrors: true,
};

export default config;
