'use client';

import { getTags, postTag } from '@/api/postApi';
import useComposition from '@/hooks/useComposition';
import { TagType } from '@/types/tag.types';
import { debounce } from 'lodash';
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { flushSync } from 'react-dom';

interface TagContextType {
  tags: TagType[];
  addTag: (tag: string) => void;
  deleteTag: (tagId: number) => void;
  inputRef: React.RefObject<HTMLDivElement>;
  tagContainerRef: React.RefObject<HTMLDivElement>;
  handleFocusTagInput: () => void;
  handleInput: () => void;
  searchTags: TagType[] | null;
  handleClickBackDropData: (label: string) => void;
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
  //TODO: submit 할 떄
  const [tags, setTags] = useState<TagType[]>([]);
  const [searchTags, setSearchTags] = useState<TagType[] | null>(null);

  const inputRef = useRef<HTMLDivElement>(null);
  const tagContainerRef = useRef<HTMLDivElement>(null);
  const { isComposing } = useComposition(inputRef);

  const addTag = useCallback(
    async (tag: string) => {
      if (
        tags.find(
          (tagState) => tagState.tagName.toUpperCase() === tag.toUpperCase(),
        )
      ) {
        return;
      }

      if (searchTags) {
        if (
          !searchTags.some(
            (searchTag) =>
              searchTag.tagName.toUpperCase() === tag.toUpperCase(),
          )
        ) {
          await postTag(tag);
        }
      }

      const newTag: TagType = {
        tagId: Date.now(),
        tagName: tag,
      };
      flushSync(() => {
        setTags((prevState) => [...prevState, newTag]);
      });
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

  const deleteTag = useCallback((tagId: number) => {
    setTags((prevState) => prevState.filter((tag) => tag.tagId !== tagId));
  }, []);

  const removeLastTag = useCallback(() => {
    setTags((prevState) => prevState.slice(0, -1));
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
  const handleClickBackDropData = useCallback(
    (label: string) => {
      addTag(label);
      if (inputRef.current) {
        inputRef.current.innerText = '';
      }
      closeBackDrop();
    },
    [addTag],
  );

  const handleKeyDownComma = useCallback(
    (event: Event) => {
      const target = event.target as HTMLDivElement;
      if (target.innerText.includes(',')) {
        const tag = target.innerText.replace(',', '').trim();
        if (tag) {
          addTag(tag.replace(',', ''));
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
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !isComposing && inputRef.current) {
        const tag = inputRef.current.innerText.trim();
        if (tag) {
          addTag(tag);
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
      handleClickBackDropData,
    }),
    [
      tags,
      addTag,
      deleteTag,
      handleFocusTagInput,
      handleInput,
      searchTags,
      handleClickBackDropData,
    ],
  );

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
