'use client';

import styles from '@/styles/tagInput.module.css';
import React, { ComponentProps, useEffect } from 'react';

interface TagInputProps extends ComponentProps<'div'> {
  placeholder?: string;
}

const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  ({ placeholder = 'Enter text...', ...props }, ref) => {
    // div placeholder 적용
    const handleFocus = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.classList.remove(styles['empty-placeholder']);
      }
    };

    const handleBlur = () => {
      if (ref && 'current' in ref && ref.current) {
        if (ref.current.innerText.trim() === '') {
          ref.current.classList.add(styles['empty-placeholder']);
        } else {
          ref.current.classList.remove(styles['empty-placeholder']);
        }
      }
    };

    useEffect(() => {
      if (
        ref &&
        'current' in ref &&
        ref.current &&
        ref.current.innerText.trim() === ''
      ) {
        ref.current.classList.add(styles['empty-placeholder']);
      }
    }, [ref]);

    return (
      <div
        {...props}
        ref={ref}
        className={`relative flex h-[61px] w-full cursor-pointer items-center text-sm font-medium outline-none ${props.className || ''}`}
        role="textbox"
        aria-multiline="false"
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-placeholder={placeholder}
        style={{
          position: 'relative',
        }}
      ></div>
    );
  },
);

TagInput.displayName = 'TagInput';

export default TagInput;
