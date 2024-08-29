'use client';

import { classMerge } from '@/utils/utils';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

export const SelectInputVariants = cva(
  'relative flex justify-self-start text-md font-medium',
  {
    variants: {
      variant: {
        unSelected: 'text-gray-300',
        selected: 'text-gray-900',
        menubar: 'bg-primary-400 text-white',
      },
    },
    defaultVariants: {
      variant: 'unSelected',
    },
  },
);

interface SelectInputProps
  extends PropsWithChildren<VariantProps<typeof SelectInputVariants>> {
  className?: string;
  clicked: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const SelectInput = ({
  children,
  clicked,
  className,
  variant,
  onClick,
}: SelectInputProps) => {
  return (
    <div className="flex cursor-pointer justify-between" onClick={onClick}>
      <span className={classMerge(SelectInputVariants({ variant }), className)}>
        {children}
      </span>
      {onClick && (
        <div
          data-clicked={clicked}
          className="flex h-6 w-6 rotate-180 items-center justify-center transition-transform duration-500 ease-in-out data-[clicked=false]:rotate-0"
        >
          <Image
            src={
              variant === 'menubar'
                ? '/assets/icons/selectArrowWhite.svg'
                : '/assets/icons/selectArrow.svg'
            }
            alt={'select arrow icon'}
            fill
          />
        </div>
      )}
    </div>
  );
};

export default SelectInput;
