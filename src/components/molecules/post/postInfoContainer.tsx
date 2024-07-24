'use client';

import { getPeriod } from '@/api/postApi';
import FormSpan from '@/components/atoms/formSpan';
import TitleContainer from '@/components/molecules/post/titleContainer';
import TutorContainer from '@/components/molecules/post/tutorContainer';
import SelectCategoryFormBox from '@/components/organisms/selectCategoryFormBox';
import SelectFormBox from '@/components/organisms/selectFormBox';
import useSelectBox from '@/hooks/useSelectBox';
import { PostsFormSchema, postTypeList } from '@/types/posts.types';
import { SelectOptionType } from '@/types/signup.types';
import { useQuery } from '@tanstack/react-query';
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
  register,
  watch,
  errors,
}: PostInputContainerProps) => {
  const { data: period } = useQuery({
    queryKey: ['period'],
    queryFn: () => getPeriod<SelectOptionType[]>('UNITY'),
    retry: 3,
    staleTime: Infinity,
  });

  const { handleSelected: handlePeriodSelected } = useSelectBox(
    period ? period : [],
  );

  const {
    selectOptions: postTypeSelectedOptions,
    handleSelected: handlePostTypeSelected,
  } = useSelectBox(postTypeList);

  return (
    <section className="flex gap-4">
      <TitleContainer title="기수">
        <Controller
          name="period"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectFormBox<PostsFormSchema>
              options={period ? period : []}
              label={''}
              onSelect={(value) => {
                handlePeriodSelected(value);
                onChange(value);
              }}
              variant="secondary"
              className="w-[334px] border border-blue-100 bg-white px-4 py-[18.5px]"
              value={value}
            />
          )}
        />
        {errors.period?.message && (
          <FormSpan variant="error">{errors.period.message}</FormSpan>
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
              className="w-[334px] border border-blue-100 bg-white px-4 py-[18.5px]"
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
