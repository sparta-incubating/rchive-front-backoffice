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
      <TitleContainer title="제목">
        <UploadInput
          {...register('title')}
          watch={watch('title')}
          isUseButton={false}
          placeholder="제목을 입력해 주세요."
        />
      </TitleContainer>

      <TitleContainer title="노션 링크">
        <UploadInput
          {...register('contentLink')}
          watch={watch('contentLink')}
          placeholder="자료 링크를 입력해주세요."
        />
      </TitleContainer>

      <TitleContainer title="유튜브 링크">
        <UploadInput
          {...register('videoLink')}
          watch={watch('videoLink')}
          placeholder="영상 링크를 입력해주세요."
        />
      </TitleContainer>
    </section>
  );
};

export default PostInputContainer;
