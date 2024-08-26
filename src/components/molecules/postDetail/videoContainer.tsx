'use client';

import { extractYouTubeId } from '@/utils/utils';
import YouTube from 'react-youtube';

interface VideoComponentProps {
  videoLink: string;
}

const VideoContainer = ({ videoLink }: VideoComponentProps) => {
  return (
    <div className="w-full">
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
    </div>
  );
};

export default VideoContainer;
