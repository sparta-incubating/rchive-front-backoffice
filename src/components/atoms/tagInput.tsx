import { TagInputRef } from '@/types/tag.types';
import { ComponentProps, forwardRef, useImperativeHandle, useRef } from 'react';

const TagInput = forwardRef<TagInputRef, ComponentProps<'div'>>(
  ({ ...props }, ref) => {
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

    return (
      <div
        {...props}
        ref={internalRef}
        className={`inline-block w-auto max-w-full outline-none ${props.className}`}
        contentEditable="true"
        role="textbox"
        aria-multiline="false"
      ></div>
    );
  },
);

export default TagInput;
