import { ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const UploadThumbnailVariants = cva(
  'flex max-w-[228px] flex-col items-center justify-center rounded-[8px] bg-blue-55 ',
  {
    variants: {
      variant: {
        text: 'py-[45px] min-h-[42px]',
        image: 'min-h-[132px]',
      },
    },
    defaultVariants: {
      variant: 'text',
    },
  },
);

interface UploadThumbnailProps
  extends VariantProps<typeof UploadThumbnailVariants> {
  children: ReactNode;
}

/**
 * Thumbnail component 사용 예시
 * ## text 사용시
 *         <UploadThumbnail>
 *           <UploadThumbnailText>썸네일</UploadThumbnailText>
 *           <UploadThumbnailText>자동 업로드</UploadThumbnailText>
 *         </UploadThumbnail>
 *
 * ## image 사용시
 *         <UploadThumbnail variant={'image'}>
 *           <img
 *             src={'/assets/test/img.png'}
 *             alt={'test img'}
 *             className="object-fill"
 *           />
 *         </UploadThumbnail>
 *
 * @param children
 * @param variant
 * @constructor
 */

const UploadThumbnail = ({ children, variant }: UploadThumbnailProps) => {
  return <div className={UploadThumbnailVariants({ variant })}>{children}</div>;
};

export default UploadThumbnail;
