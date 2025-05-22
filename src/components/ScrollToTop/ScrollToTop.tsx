import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  readonly children: ReactNode;
}

export default function ScrollToTop({ children }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return <>{children}</>;
}
