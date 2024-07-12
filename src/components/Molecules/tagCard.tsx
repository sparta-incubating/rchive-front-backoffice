import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

const tagCardVariants = cva(
  'mx-1 mt-1 mb-2 inline-block rounded-full pl-3 pr-1 py-1 border',
  {
    variants: {
      variant: {
        primary: 'bg-black text-white border-black',
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
  },
);

interface TagCardProps
  extends PropsWithChildren<VariantProps<typeof tagCardVariants>> {
  className?: string;
}

function TagCard({ children, variant, size, className = '' }: TagCardProps) {
  return (
    <span
      onClick={(e) => e.stopPropagation()}
      className={classMerge(tagCardVariants({ variant, size }), className)}
    >
      <div className="flex w-full justify-between gap-2">{children}</div>
    </span>
  );
}

export default TagCard;
