'use client';

import { useTagContext } from '@/context/tag.context';
import styles from '@/styles/tagInput.module.css';
import { ComponentProps, useEffect } from 'react';

interface TagInputProps extends ComponentProps<'div'> {
  placeholder?: string;
}

const TagInput = ({
  placeholder = 'Enter text...',
  ...props
}: TagInputProps) => {
  const { inputRef, handleInput } = useTagContext();

  // div placeholder 적용
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.classList.remove(styles['empty-placeholder']);
    }
  };

  const handleBlur = () => {
    if (inputRef.current && inputRef.current.innerText.trim() === '') {
      inputRef.current.classList.add(styles['empty-placeholder']);
    } else {
      inputRef.current!.classList.remove(styles['empty-placeholder']);
    }
  };

  useEffect(() => {
    if (inputRef.current && inputRef.current.innerText.trim() === '') {
      inputRef.current.classList.add(styles['empty-placeholder']);
    }
  }, [inputRef]);

  return (
    <div
      {...props}
      ref={inputRef}
      className={`relative flex w-auto min-w-[280px] max-w-full items-center font-medium outline-none ${props.className || ''}`}
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
};

export default TagInput;
