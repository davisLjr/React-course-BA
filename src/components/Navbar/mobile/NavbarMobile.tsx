import React from 'react';
import type { MobileNavbarPropTypes } from '../types';
import '../navbar.scss';

export const MobileNavbar: React.FC<MobileNavbarPropTypes> = ({ leftContent, rightContent, className = '', theme= 'light' }) => {
  const classes = [
    'navbar',
    'navbar--mobile',
    className,
    `navbar--${theme}`,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <nav className={classes}>
      <div className="navbar__section--left">
        {leftContent}
      </div>
      <div className="navbar__section--right">
        {rightContent}
      </div>
    </nav>
  )
}