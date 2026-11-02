import { tv } from 'tailwind-variants';

const buttonStyles = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-button transition-colors',
  variants: {
    variant: {
      primary: 'bg-primary-600 text-white shadow-sm hover:bg-primary-700',
      secondary:
        'border border-neutral-200 bg-white text-neutral-800 shadow-sm hover:border-neutral-300 hover:bg-neutral-100',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export { buttonStyles };
