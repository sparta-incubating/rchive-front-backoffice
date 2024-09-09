import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, ReactNode } from 'react';

const divVariants = cva('absolute left-0', {
  variants: {
    variant: {
      permission: 'top-[32px]',
      category: 'top-[26px]',
    },
  },
  defaultVariants: {
    variant: 'permission',
  },
});

interface DivProps
  extends ComponentProps<'div'>,
    VariantProps<typeof divVariants> {
  children: ReactNode;
  className?: string;
  show: boolean;
  isClicked?: boolean;
  backdropClassname?: string;
}

const PostIsOpenDropDown = ({
  children,
  className,
  variant,
  show,
  isClicked = false,
  backdropClassname,
  ...props
}: DivProps) => {
  return (
    <div
      {...props}
      className={classMerge(
        divVariants({ variant }),
        className,
        show ? 'z-30 block' : 'hidden',
      )}
    >
      <div
        className={classMerge(
          'flex h-[64px] w-[160px] flex-col items-center justify-center rounded-[14px] bg-white shadow-dropDownBox',
          backdropClassname,
        )}
        data-clicked={isClicked}
      >
        {children}
      </div>
    </div>
  );
};

export default PostIsOpenDropDown;
