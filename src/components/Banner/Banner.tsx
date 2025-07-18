import React from 'react';
import { motion } from 'framer-motion';
import './banner.scss';
import type { BannerPropTypes } from './types';
import { Text } from '../Text/Text';
import useMedia from 'use-media';

export const Banner: React.FC<BannerPropTypes> = ({
  imgSrc,
  title,
  imgAlt,
  className = '',
  invertedtheme = true
}) => {
  const isMobile = useMedia({ maxWidth: '1017px' });

  const classes = ['banner', isMobile && 'banner--mobile', className].filter(Boolean).join(' ');
  const titleClass = ['title-banner', isMobile && 'title-banner--mobile'].filter(Boolean).join(' ');

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Banner: ${title}`}
    >
      <motion.img
        src={imgSrc}
        alt={imgAlt}
        className="img-bg"
        width={100}
        height={540}
        loading="eager"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <motion.div
        className="title-wrapper"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
      >
        <Text as="h1" className={titleClass} themeInverted={invertedtheme}>
          {title}
        </Text>
      </motion.div>
    </section>
  );
};
