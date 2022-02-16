import { useEffect, useState } from 'react';

const useMediaQuery = (query: string) => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== match) {
      setMatch(media.matches);
    }

    const eventListener = () => setMatch(media.matches);
    window.addEventListener('resize', eventListener);
    return () => window.removeEventListener('resize', eventListener);
  }, [match, query]);

  return match;
};

export default useMediaQuery;
