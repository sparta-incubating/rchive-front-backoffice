import FormSpan from '@/components/atoms/formSpan';
import UploadInput from '@/components/atoms/uploadInput';
import TitleContainer from '@/components/molecules/post/titleContainer';
import { PostsFormSchema } from '@/types/posts.types';
import { extractPageId } from '@/utils/notionAPI';
import axios from 'axios';
import { useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

interface PostInputContainerProps {
  register: UseFormRegister<PostsFormSchema>;
  watch: UseFormWatch<PostsFormSchema>;
  errors: FieldErrors<PostsFormSchema>;
}

const PostInputContainer = ({
  register,
  watch,
  errors,
}: PostInputContainerProps) => {
  const [validateState, setValidateState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNotionUrlValidate = async () => {
    const url = watch('contentLink');
    if (url) {
      const notionPageId = extractPageId(url);

      if (notionPageId) {
        try {
          await Promise.all([
            axios.get(
              `/api/notion/database?url=${encodeURIComponent(notionPageId)}`,
            ),
            axios.get(
              `/api/notion/webShare?url=${encodeURIComponent(notionPageId)}`,
            ),
          ]);

          setErrorMessage(null);
        } catch (error) {
          setValidateState(true);
          if (axios.isAxiosError(error) && error.response) {
            setErrorMessage(
              error.response.data.message || '알 수 없는 오류가 발생했습니다.',
            );
          } else {
            setErrorMessage('알 수 없는 오류가 발생했습니다.');
          }
          console.error(error);
        }
      }
    }
  };
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
            watch={watch('contentLink')}
            placeholder="노션 링크를 입력해주세요."
            buttonLabel="링크검증"
            onClick={handleNotionUrlValidate}
          />
        </TitleContainer>
        {errors.contentLink?.message && (
          <FormSpan variant="error">{errors.contentLink.message}</FormSpan>
        )}
        {errorMessage && <FormSpan variant="error">{errorMessage}</FormSpan>}
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
