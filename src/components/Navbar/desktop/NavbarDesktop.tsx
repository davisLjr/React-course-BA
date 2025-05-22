import React from 'react';
import type { NavbarPropTypes } from '../types';
import '../navbar.scss';

export const Navbar: React.FC<NavbarPropTypes> = ({ leftContent, centerContent, rightContent, className = '', theme = 'light' }) => {
  const classes = [
    'navbar',
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
      <div className="navbar__section--center">
        {centerContent}
      </div>
      <div className="navbar__section--right">
        {rightContent}
      </div>
    </nav>
  )
}