import UploadInput from '@/components/atoms/uploadInput';
import { PostsFormSchema } from '@/types/posts.types';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface TutorContainer {
  register: UseFormRegister<PostsFormSchema>;
  watch: UseFormWatch<PostsFormSchema>;
}

const TutorContainer = ({ register, watch }: TutorContainer) => {
  return (
    <UploadInput
      {...register('tutor')}
      watch={watch('tutor')}
      isUseButton={false}
      placeholder="튜터명을 입력해주세요."
    />
  );
};

export default TutorContainer;
