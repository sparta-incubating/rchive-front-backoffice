import FormSpan from '@/components/atoms/formSpan';
import UploadInput from '@/components/atoms/uploadInput';
import TitleContainer from '@/components/molecules/post/titleContainer';
import { PostsFormSchema } from '@/types/posts.types';
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
            isUseButton={false}
            placeholder="노션 링크를 입력해주세요."
          />
        </TitleContainer>
        {errors.contentLink?.message && (
          <FormSpan variant="error">{errors.contentLink.message}</FormSpan>
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
