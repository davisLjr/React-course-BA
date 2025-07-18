import React, { forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import type { ButtonPropTypes } from './types';
import './button.scss';

const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonPropTypes
>(
  (
    {
      isLink = false,
      to,
      href,
      text,
      theme = 'light',
      icon,
      iconPosition = 'left',
      fullWidth = false,
      children,
      size = 'medium',
      outline = false,
      color = 'primary',
      className,
      hasBadge = false,
      badgeCount = 0,
      ...rest
    },
    ref
  ) => {
    const classes = [
      'btn',
      `btn--${theme}`,
      `btn--${size}`,
      `btn--${color}`,
      fullWidth && 'btn--full',
      outline && 'btn--outline',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {icon && iconPosition === 'left' && (
          <span className="btn__icon btn__icon--left">{icon}</span>
        )}
        {text ?? children}
        {icon && iconPosition === 'right' && (
          <span className="btn__icon btn__icon--right">{icon}</span>
        )}
        {hasBadge && badgeCount > 0 && (
          <span className="btn__badge">{badgeCount}</span>
        )}
      </>
    );

    if (isLink && to) {
      const linkProps = rest as Omit<LinkProps, 'to' | 'className'>;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={to}
          className={classes}
          {...linkProps}
        >
          {content}
        </Link>
      );
    }

    if (isLink && href) {
      const anchorProps =
        rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    const buttonProps =
      rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...buttonProps}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
