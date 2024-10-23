'use client';

import { extractYouTubeId } from '@/utils/utils';

interface VideoComponentProps {
  videoLink: string;
}

const VideoContainer = ({ videoLink }: VideoComponentProps) => {
  return (
    <div className="w-full">
      <iframe
        allow="picture-in-picture; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        src={`https://www.youtube.com/embed/${extractYouTubeId(videoLink)}`}
        title="YouTube video player"
        width="100%"
        height="444"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoContainer;
