import type { ReactNode, ElementType } from 'react';
/** Opciones de alineación vertical */
export type AlignOptions = 'center' | 'end' | 'start';

/** Props propias de <Text> */
export type TextOwnProps<E extends ElementType> = {
  as?: E;
  align?: AlignOptions;
  theme?: 'light' | 'dark';
  themeInverted?: boolean
  className?: string;
  children: ReactNode;
};

export type TextProps<E extends ElementType = 'p'> = 
  TextOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof TextOwnProps<E>>;
