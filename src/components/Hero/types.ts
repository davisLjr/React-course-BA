import type { ReactNode } from "react";

export interface HeroVideoSource {
  src: string;
  type: string;
}

export interface HeroProps {
  titlePrimary: ReactNode;
  titleSecondary?: ReactNode;
  buttonText: string;
  onButtonClick?: () => void;
  poster?: string;                  // URL al póster de vídeo
  videoSources?: HeroVideoSource[]; // Array de fuentes de vídeo          // Ej: '60px'
  style?: React.CSSProperties;  
  linkTo?: string;
  onVideoReady?: () => void;
}
