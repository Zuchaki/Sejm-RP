import { Button as ButtonPrimitive } from '@base-ui/react/button';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

const buttonStyles = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-xl text-button transition-colors',
  variants: {
    variant: {
      primary: 'bg-primary-600 text-white shadow-sm hover:bg-primary-700',
      secondary:
        'border border-neutral-200 bg-white text-neutral-800 shadow-sm hover:border-neutral-300 hover:bg-neutral-100',
    },
    size: {
      default: 'px-5 py-3',
      icon: 'size-10',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

type ButtonProps = Omit<ButtonPrimitive.Props, 'className'> &
  VariantProps<typeof buttonStyles> & { className?: string };

const Button = ({ variant, size, className, ...rest }: ButtonProps) => (
  <ButtonPrimitive
    data-slot="button"
    className={buttonStyles({ variant, size, className })}
    {...rest}
  />
);

export { Button, buttonStyles };
