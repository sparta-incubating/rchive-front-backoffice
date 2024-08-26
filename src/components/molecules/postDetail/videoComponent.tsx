'use client';

import SocialButtonGroup from '@/components/molecules/postDetail/socialButtonGroup';
import useSocialButtonPosition from '@/hooks/useSocialButtonPosition';
import { extractYouTubeId } from '@/utils/utils';
import YouTube from 'react-youtube';

interface VideoComponentProps {
  videoLink: string;
}

const VideoComponent = ({ videoLink }: VideoComponentProps) => {
  const { containerRef, fixedPosition } = useSocialButtonPosition();

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full">
      <YouTube
        videoId={extractYouTubeId(videoLink)}
        opts={{
          width: '100%',
          height: '444px',
          playerVars: {
            autoplay: 1,
            modestbranding: 1,
            loop: 1,
          },
        }}
      />
      <div
        className="fixed"
        style={{
          top: `${fixedPosition.top}px`,
          left: `${fixedPosition.left}px`,
        }}
      >
        <SocialButtonGroup />
      </div>
    </div>
  );
};

export default VideoComponent;
