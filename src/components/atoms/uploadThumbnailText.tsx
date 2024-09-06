import Image from 'next/image';
import { PropsWithChildren } from 'react';

const UploadThumbnailText = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Image
        src={'/backoffice/assets/icons/defaultThumbnail.png'}
        alt="기본 썸네일"
        fill
      />
      <div className="absolute inset-0 bg-image-black"></div>
      <div className="relative z-10 text-center text-sm font-medium text-gray-50">
        {children}
      </div>
    </div>
  );
};

export default UploadThumbnailText;
