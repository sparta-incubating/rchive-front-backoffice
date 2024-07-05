import { ComponentProps } from 'react';

const MoreLink = ({ ...props }: ComponentProps<'a'>) => {
  return (
    <a {...props} target="_blank" className="text-xs text-gray-400 underline">
      보기
    </a>
  );
};

export default MoreLink;
