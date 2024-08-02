import { PropsWithChildren } from 'react';

const UploadThumbnailText = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute inset-0 bg-[url('/assets/icons/defaultThumbnail.png')] bg-center bg-no-repeat"></div>
      <div className="bg-image-black absolute inset-0"></div>
      <div className="relative z-10 text-center text-sm font-medium text-gray-50">
        {children}
      </div>
    </div>
  );
};

export default UploadThumbnailText;
