// src/components/Hero/Hero.tsx
import React, { useRef } from 'react';
import type { HeroProps } from './types';
import './hero.scss';
import Button from '../Button/Button';
import { useTheme } from '../../context/ThemeContext';
import useMedia from 'use-media';

export const Hero: React.FC<HeroProps> = ({
  titlePrimary,
  titleSecondary,
  buttonText,
  onButtonClick,
  poster,
  videoSources,
  linkTo,
  style,
  onVideoReady,
}) => {
  const { theme } = useTheme();
  const isMobile = useMedia({ maxWidth: '1017px' });
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    const v = videoRef.current!;
    // reiniciamos sin soltar marcos
    v.currentTime = 0;
    v.play();
  };

  const classes = [
    'hero__action',
    isMobile && 'hero__action--mobile'
  ].filter(Boolean).join(' ');

  return (
    <section className="hero" style={style}>
      <video
        ref={videoRef}
        className="hero__video"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={poster}
        onEnded={handleEnded}
        onCanPlay={onVideoReady} 
      >
        {videoSources?.map(({ src, type }) => (
          <source key={src} src={src} type={type} />
        ))}
      </video>

      <div className="hero__content">
        <div className="hero__texts">
          <div className="hero__title-primary">{titlePrimary}</div>
          {titleSecondary && (
            <div className="hero__title-secondary">{titleSecondary}</div>
          )}
        </div>
        <div className={classes}>
          <Button
            color="primary"
            theme={theme}
            onClick={onButtonClick}
            isLink
            to={linkTo}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};
