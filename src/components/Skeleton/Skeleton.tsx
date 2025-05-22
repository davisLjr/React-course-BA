import React from 'react';
import type { SkeletonProps } from './types';
import './skeleton.scss';

const Skeleton: React.FC<SkeletonProps> = ({
  shape = 'square',
  width = '100%',
  height = '1rem',
  borderRadius,
  animation = 'pulse',
  className = '',
}) => {
  const classes = [
    'skeleton',
    `skeleton--${shape}`,
    `skeleton--${animation}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (borderRadius != null) {
    style.borderRadius = typeof borderRadius === 'number'
      ? `${borderRadius}px`
      : borderRadius;
  } else if (shape === 'circle') {
    style.borderRadius = '50%';
  }

  return <div className={classes} style={style} />;
};

export default Skeleton;
