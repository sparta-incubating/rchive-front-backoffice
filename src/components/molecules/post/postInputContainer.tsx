'use client';

import FormSpan from '@/components/atoms/formSpan';
import UploadInput from '@/components/atoms/uploadInput';
import TitleContainer from '@/components/molecules/post/titleContainer';
import useIsLoading from '@/hooks/useIsLoading';
import { PostsFormSchema } from '@/types/posts.types';
import { extractPageId, validateNotionPageId } from '@/utils/notion/notionAPI';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

interface PostInputContainerProps {
  register: UseFormRegister<PostsFormSchema>;
  watch: UseFormWatch<PostsFormSchema>;
  errors: FieldErrors<PostsFormSchema>;
  notionValidateState: boolean;
  setNotionValidateState: Dispatch<SetStateAction<boolean>>;
  isUpdatedMod: boolean;
  initialContentLink?: string;
}

const PostInputContainer = ({
  register,
  watch,
  errors,
  notionValidateState,
  setNotionValidateState,
  isUpdatedMod,
  initialContentLink,
}: PostInputContainerProps) => {
  const [validateIsLoading, handleValidateIsLoading] = useIsLoading();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const contentLink = watch('contentLink');

  const handleNotionUrlValidate = async () => {
    handleValidateIsLoading(true);
    const url = watch('contentLink');
    if (!url) {
      setErrorMessage('유효하지 않은 URL입니다.');
      handleValidateIsLoading(false);
      return;
    }

    const notionPageId = extractPageId(url);

    if (!notionPageId) {
      setErrorMessage('유효하지 않은 URL입니다.');
      handleValidateIsLoading(false);
      return;
    }

    try {
      await validateNotionPageId(notionPageId);
      setErrorMessage(null);
      setNotionValidateState(true);
      handleValidateIsLoading(false);
    } catch (error) {
      handleError(error);
      setNotionValidateState(false);
      handleValidateIsLoading(false);
    }
  };

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
      setErrorMessage(
        error.response.data.message || '알 수 없는 오류가 발생했습니다.',
      );
    } else {
      setErrorMessage('알 수 없는 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (!isUpdatedMod) {
      setNotionValidateState(false);
      setErrorMessage(null);
    } else {
      if (initialContentLink !== contentLink) {
        setNotionValidateState(false);
        setErrorMessage(null);
      }
    }
  }, [contentLink, setNotionValidateState, isUpdatedMod, initialContentLink]);

  return (
    <section className="flex gap-4">
      <article>
        <TitleContainer title="제목">
          <UploadInput
            {...register('title')}
            watch={watch('title')}
            isUseButton={false}
            placeholder="제목을 입력해 주세요."
          />
        </TitleContainer>
        {errors.title?.message && (
          <FormSpan variant="error">{errors.title.message}</FormSpan>
        )}
      </article>

      <article>
        <TitleContainer title="노션 링크">
          <UploadInput
            {...register('contentLink')}
            watch={contentLink}
            placeholder="노션 링크를 입력해주세요."
            buttonLabel="주소확인"
            onClick={handleNotionUrlValidate}
            validate={notionValidateState}
            isLoading={validateIsLoading}
          />
        </TitleContainer>
        {errors.contentLink?.message && (
          <FormSpan variant="error">{errors.contentLink.message}</FormSpan>
        )}
        {errorMessage && <FormSpan variant="error">{errorMessage}</FormSpan>}
        {notionValidateState && (
          <FormSpan variant="success">링크가 확인되었습니다.</FormSpan>
        )}
      </article>

      <article>
        <TitleContainer title="유튜브 링크">
          <UploadInput
            {...register('videoLink')}
            watch={watch('videoLink')}
            isUseButton={false}
            placeholder="유튜브 링크를 입력해주세요."
          />
        </TitleContainer>
        {errors.videoLink?.message && (
          <FormSpan variant="error">{errors.videoLink.message}</FormSpan>
        )}
      </article>
    </section>
  );
};

export default PostInputContainer;
