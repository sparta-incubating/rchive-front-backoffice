'use client';

import { getTags } from '@/api/client/postApi';
import useComposition from '@/hooks/useComposition';
import { TagType } from '@/types/tag.types';
import { createToast } from '@/utils/toast';
import { debounce } from 'lodash';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TagContextType {
  tags: TagType[];
  addTag: (tag: string) => Promise<void>;
  deleteTag: (tagId: string) => void;
  inputRef: React.RefObject<HTMLDivElement>;
  tagContainerRef: React.RefObject<HTMLDivElement>;
  handleFocusTagInput: () => void;
  handleInput: () => void;
  searchTags: TagType[] | null;
  handleClickDropDownData: (label: string) => void;
  clearTags: () => void;
  setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
}

export const TagContext = createContext<TagContextType | undefined>(undefined);

export const TagContextProvider = ({ children }: PropsWithChildren) => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [searchTags, setSearchTags] = useState<TagType[] | null>(null);

  const inputRef = useRef<HTMLDivElement>(null);
  const tagContainerRef = useRef<HTMLDivElement>(null);
  const { isComposing } = useComposition(inputRef);

  const addTag = useCallback(
    async (tag: string) => {
      if (tags?.length > 9) {
        createToast('태그는 10개까지만 입력 가능합니다.', 'warning');
        return;
      }

      if (
        tags.find(
          (tagState) => tagState.tagName.toLowerCase() === tag.toLowerCase(),
        )
      ) {
        createToast('중복된 태그입니다.', 'warning');
        return;
      }

      const newTag: TagType = {
        tagId: uuidv4(),
        tagName: tag,
      };

      setTags((prevState) => [...prevState, newTag]);

      if (tagContainerRef.current) {
        tagContainerRef.current.scrollLeft =
          tagContainerRef.current.scrollWidth;
      }
    },
    [searchTags, tags],
  );

  const closeBackDrop = () => {
    setSearchTags(null);
  };

  const deleteTag = useCallback((tagId: string) => {
    setTags((prevState) => prevState.filter((tag) => tag.tagId !== tagId));
  }, []);

  const removeLastTag = useCallback(() => {
    setTags((prevState) => prevState.slice(0, -1));
  }, []);

  const clearTags = useCallback(() => {
    setTags((prevState) => []);
  }, []);

  const handleFocusTagInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // debounce 적용하여 자동완성 dropdown 출력에 사용
  const handleInput = debounce(async () => {
    if (inputRef.current) {
      const keyword = inputRef.current.innerText;

      // text가 없을때 backDrop 숨김
      if (keyword.trim() === '') {
        closeBackDrop();
        return;
      }

      const data = await getTags(keyword);
      setSearchTags(data);
    }
  }, 300);

  /**
   * backDrop data를 클릭했을때 사용하는 함수
   * addTag를 호출하여 태그를 생성하고 backDrop을 닫는다.
   */
  const handleClickDropDownData = useCallback(
    async (label: string) => {
      await addTag(label);
      if (inputRef.current) {
        inputRef.current.innerText = '';
      }
      closeBackDrop();
    },
    [addTag],
  );

  const handleKeyDownComma = useCallback(
    async (event: Event) => {
      const target = event.target as HTMLDivElement;
      if (target.innerText.includes(',')) {
        const tag = target.innerText.replace(',', '').trim();
        if (tag) {
          await addTag(tag.replace(',', ''));
          if (inputRef.current) {
            inputRef.current.innerText = '';
            closeBackDrop();
          }
        }
      }
    },
    [addTag],
  );

  const handleKeyDownBackspace = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Backspace' && !inputRef.current?.innerText) {
        const content = inputRef?.current?.innerText.trim();
        if (content === '') {
          removeLastTag();
        }
      }
    },
    [removeLastTag],
  );

  const handleKeyDownEnter = useCallback(
    async (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !isComposing && inputRef.current) {
        const tag = inputRef.current.innerText.trim();
        if (tag) {
          await addTag(tag);
          if (inputRef.current) {
            inputRef.current.innerText = '';
          }
          event.preventDefault();
        }
      }
    },
    [addTag, isComposing],
  );

  useEffect(() => {
    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener('input', handleKeyDownComma);
      inputElement.addEventListener('keydown', handleKeyDownBackspace);
      inputElement.addEventListener('keydown', handleKeyDownEnter);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('input', handleKeyDownComma);
        inputElement.removeEventListener('keydown', handleKeyDownBackspace);
        inputElement.removeEventListener('keydown', handleKeyDownEnter);
      }
    };
  }, [
    addTag,
    handleKeyDownBackspace,
    handleKeyDownComma,
    handleKeyDownEnter,
    inputRef,
    removeLastTag,
  ]);

  const value = useMemo(
    () => ({
      tags,
      addTag,
      deleteTag,
      inputRef,
      tagContainerRef,
      handleFocusTagInput,
      handleInput,
      searchTags,
      handleClickDropDownData,
      clearTags,
      setTags,
    }),
    [
      tags,
      addTag,
      deleteTag,
      handleFocusTagInput,
      handleInput,
      searchTags,
      handleClickDropDownData,
      clearTags,
      setTags,
    ],
  );

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
