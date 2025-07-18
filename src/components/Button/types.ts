import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import type { LinkProps } from 'react-router-dom';

export type ButtonPropTypes = {
  /** Renderizar como enlace (Link o <a>) */
  isLink?: boolean;
  /** Ruta interna (React Router) */
  to?: LinkProps['to'];
  /** URL externa */
  href?: string;
} &
  (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>) & {
  text?: string;
  theme?: 'dark' | 'light';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  outline?: boolean;
  color?: 'primary' | 'secondary' | 'base';
  hasBadge?: boolean;
  badgeCount?: number;
  disabled?: boolean
};