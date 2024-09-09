'use client';

import styles from '@/styles/tagInput.module.css';
import React, { ComponentProps, useEffect } from 'react';

interface TagInputProps extends ComponentProps<'div'> {
  placeholder?: string;
  handleInput: () => void;
}

const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  ({ placeholder = 'Enter text...', handleInput, ...props }, ref) => {
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
        className={`relative flex w-auto min-w-[280px] max-w-full items-center text-sm font-medium outline-none ${props.className || ''}`}
        contentEditable="true"
        role="textbox"
        aria-multiline="false"
        onInput={handleInput}
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
