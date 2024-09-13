'use client';

import FormSpan from '@/components/atoms/formSpan';
import TitleContainer from '@/components/molecules/post/titleContainer';
import TutorContainer from '@/components/molecules/post/tutorContainer';
import SelectCategoryFormBox from '@/components/organisms/selectCategoryFormBox';
import SelectFormBox from '@/components/organisms/selectFormBox';
import useGetPeriod from '@/hooks/useGetPeriod';
import usePostTypeNames from '@/hooks/usePostTypeNames';
import useSelectBox from '@/hooks/useSelectBox';
import { useAppSelector } from '@/redux/storeConfig';
import { PostsFormSchema } from '@/types/posts.types';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

interface PostInputContainerProps {
  setValue: UseFormSetValue<PostsFormSchema>;
  control: Control<PostsFormSchema>;
  register: UseFormRegister<PostsFormSchema>;
  watch: UseFormWatch<PostsFormSchema>;
  errors: FieldErrors<PostsFormSchema>;
}

const PostInfoContainer = ({
  setValue,
  control,
  watch,
  errors,
}: PostInputContainerProps) => {
  const { trackRole, trackName } = useAppSelector((state) => state.authSlice);

  const period = useGetPeriod(trackName);
  const { handleSelected: handlePeriodSelected } = useSelectBox(
    period ? period : [],
  );

  const { postTypeOptions } = usePostTypeNames();

  const {
    selectOptions: postTypeSelectedOptions,
    handleSelected: handlePostTypeSelected,
  } = useSelectBox(postTypeOptions);

  return (
    <section className="flex gap-4">
      <TitleContainer title="기수">
        <Controller
          name="postPeriod"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectFormBox
              options={period ? period : []}
              label={''}
              onSelect={(value) => {
                handlePeriodSelected(value);
                onChange(value);
                setValue('tutor', undefined, { shouldValidate: true });
              }}
              variant="secondary"
              className="w-[334px] border border-blue-100 bg-white px-4 py-[18.5px] text-sm"
              value={value}
              disabled={trackRole === 'APM'}
            />
          )}
        />
        {errors.postPeriod?.message && (
          <FormSpan variant="error">{errors.postPeriod.message}</FormSpan>
        )}
      </TitleContainer>

      <TitleContainer title="카테고리">
        <Controller
          name="postType"
          control={control}
          render={({ field }) => (
            <SelectCategoryFormBox<PostsFormSchema>
              options={postTypeSelectedOptions}
              label={''}
              onSelect={(value) => {
                handlePostTypeSelected(value);
                field.onChange(value);
              }}
              variant="secondary"
              className="w-[334px] border border-blue-100 bg-white px-4 py-[18.5px] text-sm"
              field={field}
            />
          )}
        />
        {errors.postType?.message && (
          <FormSpan variant="error">{errors.postType.message}</FormSpan>
        )}
      </TitleContainer>

      {/* 튜터 */}
      <TutorContainer setValue={setValue} watch={watch} errors={errors} />
    </section>
  );
};

export default PostInfoContainer;
