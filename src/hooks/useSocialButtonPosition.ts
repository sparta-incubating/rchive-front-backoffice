import { useEffect, useRef, useState } from 'react';

const useSocialButtonPosition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fixedPosition, setFixedPosition] = useState({ top: 0, left: 0 });
  const initialTopRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;

        // 초기 top 위치 설정 (한 번만)
        if (initialTopRef.current === null) {
          initialTopRef.current = rect.top + scrollY;
        }

        // 현재 스크롤 위치가 초기 위치보다 클 때만 움직임
        if (scrollY > initialTopRef.current) {
          setFixedPosition({
            top: Math.max(0, rect.top + 150),
            left: 260,
          });
        } else {
          // 초기 위치보다 위에 있으면 초기 위치로 설정
          setFixedPosition({
            top: initialTopRef.current - scrollY + 150,
            left: 260,
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 위치 설정을 위해 한 번 실행

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { containerRef, fixedPosition };
};

export default useSocialButtonPosition;
