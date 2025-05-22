import type { ReactNode } from "react";

export type BaseNavbarPropTypes = {
  leftContent: ReactNode;
  rightContent: ReactNode;
  className?: string;
  theme?: 'light' | 'dark'
}

export type NavbarPropTypes = BaseNavbarPropTypes & {
  centerContent: ReactNode;
}


export type MobileNavbarPropTypes = BaseNavbarPropTypes;