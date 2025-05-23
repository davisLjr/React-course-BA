import React from 'react';
import './banner.scss';
import type { BannerPropTypes } from './types';
import { Text } from '../Text/Text';
import useMedia from 'use-media';

export const Banner: React.FC<BannerPropTypes> = ({ imgSrc, title, imgAlt, className = '', invertedtheme = true}) => {
  const isMobile = useMedia({ maxWidth: '1017px' });
  const classes = [
    'banner',
    isMobile && 'banner--mobile',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const titleClass = [
    'title-banner',
    isMobile && 'title-banner--mobile',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <img src={imgSrc} alt={imgAlt} className='img-bg' width={100} height={540} loading="eager" />
      <Text as='h1' className={titleClass} themeInverted={invertedtheme}>{title}</Text>
    </div>
  )
}