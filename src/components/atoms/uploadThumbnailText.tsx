import { PropsWithChildren } from 'react';

const UploadThumbnailText = ({ children }: PropsWithChildren) => {
  return (
    <p className="text-center text-sm font-medium text-blue-200">{children}</p>
  );
};

export default UploadThumbnailText;
