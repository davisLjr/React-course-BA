import React, { createContext, useContext, type ElementType } from 'react';
import type { TextProps } from './types';
import './text.scss';

const ParentTagContext = createContext<ElementType | null>(null);

export function Text<E extends ElementType = 'p'>(
  props: TextProps<E>
): React.ReactElement {
  const {
    as = 'p',
    align = 'top',
    theme = 'light',
    className = '',
    themeInverted = false,
    children,
    ...rest
  } = props;

  const Component = as;
  const parentTag = useContext(ParentTagContext);

  const needsWrapper = parentTag !== Component;

  const classes = [
    'text',
    `text--align-${align}`,
    `text--${theme}`,
    themeInverted ? `text--${theme}--inverted` : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const content = needsWrapper
    ? (
      <Component className={classes} {...(rest as React.ComponentPropsWithoutRef<E>)}>
        {children}
      </Component>
    )
    : <>{children}</>;

  return (
    <ParentTagContext.Provider value={Component}>
      {content}
    </ParentTagContext.Provider>
  );
}
