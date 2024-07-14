'use client';

import { Tag } from '@/types/tag.types';
import { debounce } from 'lodash';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface TagContextType {
  tags: Tag[];
  addTag: (tag: string) => void;
  deleteTag: (tagId: number) => void;
  inputRef: React.RefObject<HTMLDivElement>;
  handleFocusTagInput: () => void;
  handleInput: () => void;
}

const TagContext = createContext<TagContextType | undefined>(undefined);

export const useTagContext = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error('TagContext 범위 밖입니다.');
  }
  return context;
};

export const TagContextProvider = ({ children }: PropsWithChildren) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);

  const addTag = useCallback((tag: string) => {
    const newTag = {
      id: Date.now(),
      name: tag,
    };
    setTags((prevState) => [...prevState, newTag]);
  }, []);

  const deleteTag = useCallback((tagId: number) => {
    setTags((prevState) => prevState.filter((tag) => tag.id !== tagId));
  }, []);

  const removeLastTag = useCallback(() => {
    console.log('지우라고!');
    setTags((prevState) => prevState.slice(0, -1));
  }, []);

  const handleFocusTagInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // debounce 적용하여 자동완성 dropdown 출력에 사용
  const handleInput = useCallback(
    debounce(() => {
      if (inputRef.current) {
        // console.log(inputRef.current.innerText);
      }
    }, 500),
    [],
  );

  useEffect(() => {
    const handleKeyDownComma = (event: Event) => {
      const target = event.target as HTMLDivElement;
      if (target.innerText.includes(',')) {
        const tag = target.innerText.replace(',', '').trim();
        if (tag) {
          addTag(tag.replace(',', ''));
          if (inputRef.current) {
            inputRef.current.innerText = '';
          }
        }
      }
    };

    const handleKeyDownBackspace = (event: KeyboardEvent) => {
      if (event.key === 'Backspace' && !inputRef.current?.innerText) {
        const content = inputRef?.current?.innerText.trim();
        if (content === '') {
          removeLastTag();
        }
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('input', handleKeyDownComma);
      inputElement.addEventListener('keydown', handleKeyDownBackspace);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('input', handleKeyDownComma);
        inputElement.removeEventListener('keydown', handleKeyDownBackspace);
      }
    };
  }, [addTag, inputRef, removeLastTag]);

  const value = useMemo(
    () => ({
      tags,
      addTag,
      deleteTag,
      inputRef,
      handleFocusTagInput,
      handleInput,
    }),
    [tags, addTag, deleteTag, handleFocusTagInput, handleInput],
  );

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
