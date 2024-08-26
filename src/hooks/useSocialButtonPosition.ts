import { useEffect, useRef, useState } from 'react';

const useSocialButtonPosition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fixedPosition, setFixedPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setFixedPosition({
          top: rect.top >= 0 ? rect.top : 0,
          left: 330,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { containerRef, fixedPosition };
};

export default useSocialButtonPosition;
