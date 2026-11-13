import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { tv } from 'tailwind-variants';

const containerStyles = tv({
  base: 'mx-auto w-full max-w-7xl px-3 lg:px-12',
});

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children?: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>;

const Container = ({ as: Element = 'div', className, ...rest }: ContainerProps) => (
  <Element {...rest} className={containerStyles({ className })} />
);

export { Container };
