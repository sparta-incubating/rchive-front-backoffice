'use client';

import styles from '@/styles/tagInput.module.css';
import { TagInputRef } from '@/types/tag.types';
import { debounce } from 'lodash';
import {
  ComponentProps,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

interface TagInputProps extends ComponentProps<'div'> {
  placeholder?: string;
}

const TagInput = forwardRef<TagInputRef, TagInputProps>(
  ({ placeholder = 'Enter text...', ...props }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        setContent: (newContent: string) => {
          if (internalRef.current) {
            internalRef.current.innerText = newContent;
          }
        },
        getContent: () => {
          return internalRef.current;
        },
        focus: () => {
          if (internalRef.current) {
            internalRef.current.focus();
          }
        },
      }),
      [],
    );

    const handleInput = debounce(() => {
      if (internalRef.current) {
        console.log(internalRef.current.innerText);
      }
    }, 500);

    const handleFocus = () => {
      if (internalRef.current) {
        internalRef.current.classList.remove(styles['empty-placeholder']);
      }
    };

    const handleBlur = () => {
      if (internalRef.current && internalRef.current.innerText.trim() === '') {
        internalRef.current.classList.add(styles['empty-placeholder']);
      } else {
        internalRef.current!.classList.remove(styles['empty-placeholder']);
      }
    };

    useEffect(() => {
      if (internalRef.current && internalRef.current.innerText.trim() === '') {
        internalRef.current.classList.add(styles['empty-placeholder']);
      }
    }, []);

    return (
      <div
        {...props}
        ref={internalRef}
        className={`relative flex w-full max-w-full items-center font-medium outline-none ${props.className || ''}`}
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
