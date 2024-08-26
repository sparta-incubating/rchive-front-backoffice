import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

const tagCardVariants = cva('inline-block rounded-full pl-3 pr-1 py-1', {
  variants: {
    variant: {
      primary: 'bg-secondary-55 text-secondary-500',
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
    <div
      onClick={(e) => e.stopPropagation()}
      className={classMerge(tagCardVariants({ variant, size }), className)}
    >
      <div className="flex w-full items-center justify-between gap-2">
        {children}
      </div>
    </div>
  );
}

export default TagCard;
