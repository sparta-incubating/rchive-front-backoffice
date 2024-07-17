import UploadInput from '@/components/atoms/uploadInput';
import TitleContainer from '@/components/molecules/post/titleContainer';
import SelectFormBox from '@/components/organisms/selectFormBox';
import { PostsFormSchema } from '@/types/posts.types';
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

interface PostInputContainerProps {
  control: Control<PostsFormSchema>;
  register: UseFormRegister<PostsFormSchema>;
  watch: UseFormWatch<PostsFormSchema>;
}

const PostInfoContainer = ({
  control,
  register,
  watch,
}: PostInputContainerProps) => {
  return (
    <section className="flex gap-4">
      <TitleContainer title="기수">
        <Controller
          name="period"
          control={control}
          render={({ field }) => (
            <SelectFormBox<PostsFormSchema>
              options={[{ value: '1', label: '1기', selected: true }]}
              label={''}
              onSelect={(value) => {}}
              variant="secondary"
              className="w-[334px] border border-blue-100 bg-white px-4 py-[18.5px]"
              field={field}
            />
          )}
        />
      </TitleContainer>

      <TitleContainer title="카테고리">
        <Controller
          name="postType"
          control={control}
          render={({ field }) => (
            <SelectFormBox<PostsFormSchema>
              options={[
                { value: '1', label: '특강/실시간섹션', selected: true },
              ]}
              label={''}
              onSelect={(value) => {}}
              variant="secondary"
              className="w-[334px] border border-blue-100 bg-white px-4 py-[18.5px]"
              field={field}
            />
          )}
        />
      </TitleContainer>

      <TitleContainer title="튜터">
        <UploadInput
          {...register('tutor')}
          watch={watch('tutor')}
          placeholder="튜터명을 입력해주세요."
        />
      </TitleContainer>
    </section>
  );
};

export default PostInfoContainer;
