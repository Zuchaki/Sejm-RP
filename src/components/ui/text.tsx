import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

const textStyles = tv(
  {
    variants: {
      variant: {
        h1: 'text-h1',
        h2: 'text-h2',
        h3: 'text-h3',
        name: 'text-name',
        stat: 'text-stat',
        body: 'text-body',
        'body-sm': 'text-body-sm',
        caption: 'text-caption',
        button: 'text-button',
      },
    },
    defaultVariants: {
      variant: 'body',
    },
  },
  {
    twMergeConfig: {
      extend: {
        classGroups: {
          'font-size': [
            {
              text: ['h1', 'h2', 'h3', 'name', 'stat', 'body', 'body-sm', 'caption', 'button'],
            },
          ],
        },
      },
    },
  },
);

type TextProps = {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<'p'>, 'children' | 'className' | 'style'> &
  VariantProps<typeof textStyles>;

const Text = (props: TextProps) => {
  const { as, variant, ...rest } = props;
  const Element = as ?? 'p';

  return <Element {...rest} className={textStyles({ variant, class: rest.className })} />;
};

export { Text, textStyles };
