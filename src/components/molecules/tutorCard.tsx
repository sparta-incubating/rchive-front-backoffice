import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

const tagCardVariants = cva('inline-block rounded-full ', {
  variants: {
    variant: {
      // primary: 'text-secondary-500',
      primary: 'text-gray-900',
      secondary: 'bg-gray-500 text-white border-gray-500',
      ghost: 'bg-transparent text-black border-black',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface TagCardProps
  extends PropsWithChildren<VariantProps<typeof tagCardVariants>> {
  className?: string;
}

function TagCard({ children, variant, size, className = '' }: TagCardProps) {
  return (
    <div className={classMerge(tagCardVariants({ variant, size }), className)}>
      <div className="text-md flex w-full items-center justify-between gap-2">
        {children}
      </div>
    </div>
  );
}

export default TagCard;
