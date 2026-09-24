import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// routes used to keep the previous scroll position — jump back to the top instead
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
