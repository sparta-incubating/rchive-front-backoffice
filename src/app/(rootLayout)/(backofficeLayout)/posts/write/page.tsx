'use client';

import Button from '@/components/atoms/button';
import CustomRadio from '@/components/atoms/customRadio';
import CalendarContainer from '@/components/molecules/post/calendarContainer';
import PostInfoContainer from '@/components/molecules/post/postInfoContainer';
import PostInputContainer from '@/components/molecules/post/postInputContainer';
import ThumbnailContainer from '@/components/molecules/post/thumbnailContainer';
import TitleContainer from '@/components/molecules/post/titleContainer';
import TagContainer from '@/components/organisms/tagContainer';
import BackofficePage from '@/components/pages/backofficePage';
import { PostsFormSchema } from '@/types/posts.types';
import { radioType } from '@/types/radio.types';
import { postsSchema } from '@/validators/posts/posts.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const isOpenRadios: radioType[] = [
  { value: 'true', label: '공개' },
  {
    value: 'false',
    label: '비공개',
  },
];

const Post = () => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostsFormSchema>({
    resolver: zodResolver(postsSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      tutor: '',
      thumbnail: '',
      contentLink: '',
      videoLink: '',
      tagNameList: [],
      uploadedAt: '',
      trackName: 'ANDROID',
      period: 0,
      isOpened: false,
    },
  });

  const onSubmit = (data: PostsFormSchema) => {
    console.log('form data = ', data);
  };

  return (
    <BackofficePage>
      <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col">
          <div className="m-6 flex max-w-[1102px] flex-col gap-4 rounded-[14px] border border-blue-100 bg-white px-9 py-8">
            {/* Thumbnail */}
            <ThumbnailContainer register={register} watch={watch} />

            {/* Inputs */}
            <PostInputContainer
              register={register}
              watch={watch}
              errors={errors}
            />

            {/* Info */}
            <PostInfoContainer
              control={control}
              register={register}
              watch={watch}
            />

            {/* Tag */}
            <TagContainer placeholder="태그 입력 최대 개수는 10개까지 가능해요." />

            {/* calendar and Radio button */}
            <div className="flex gap-4">
              <CalendarContainer />
              <TitleContainer title="공개여부">
                <div className="flex h-[64px] items-center">
                  <CustomRadio values={isOpenRadios} />
                </div>
              </TitleContainer>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="submit" className="w-[178px]">
                작성하기
              </Button>
            </div>
          </div>
        </section>
      </form>
    </BackofficePage>
  );
};
export default Post;
