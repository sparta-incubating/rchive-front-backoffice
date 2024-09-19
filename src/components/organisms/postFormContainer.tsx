'use client';

import { PostForm } from '@/class/postForm';
import Button from '@/components/atoms/button';
import CustomRadio from '@/components/atoms/customRadio';
import CalendarContainer from '@/components/molecules/post/calendarContainer';
import PostInfoContainer from '@/components/molecules/post/postInfoContainer';
import PostInputContainer from '@/components/molecules/post/postInputContainer';
import ThumbnailContainer from '@/components/molecules/post/thumbnailContainer';
import TitleContainer from '@/components/molecules/post/titleContainer';
import TagContainer from '@/components/organisms/tagContainer';
import { useTagContext } from '@/context/useTagContext';
import usePostWriteForm from '@/hooks/usePostWriteForm';
import { postFetchData } from '@/types/posts.types';
import { radioType } from '@/types/radio.types';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import PermissionBoard from '../atoms/permissionBoard';

interface PostFormContainerProps {
  postData?: postFetchData;
}

const PostFormContainer = ({ postData }: PostFormContainerProps) => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    errors,
    onSubmit,
    notionValidateState,
    setNotionValidateState,
    isValid,
  } = usePostWriteForm(postData);

  const [popupWindow, setPopupWindow] = useState<Window | null>(null);
  const { tags } = useTagContext();

  const handlePreview = useCallback(() => {
    const formData = new PostForm(
      watch('postType'),
      watch('title'),
      tags.map((tag) => tag.tagName),
      Number(watch('tutor')?.tutorId),
      Number(watch('postPeriod')),
      Boolean(watch('isOpened')),
      dayjs(watch('uploadedAt')).format('YYYY-MM-DD'),
      '',
      watch('contentLink'),
      watch('videoLink'),
      watch('thumbnailUrl'),
    );

    const popup = window.open(
      '/backoffice/preview',
      '_blank',
      'width=800,height=600',
    );
    setPopupWindow(popup);

    if (popup) {
      popup.onload = () => {
        popup.postMessage({ type: 'FORM_DATA', data: formData }, '*');
      };
    }
  }, [tags, watch]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'POPUP_LOADED') {
        popupWindow?.postMessage({ type: 'FORM_DATA', data: watch() }, '*');
      } else if (event.data.type === 'SUBMIT_FORM') {
        handleSubmit(onSubmit)();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [popupWindow, watch, handleSubmit, onSubmit]);

  return (
    <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col">
        <PermissionBoard variant="post">
          {/* Thumbnail */}
          <ThumbnailContainer
            setValue={setValue}
            initValue={watch('thumbnailUrl')}
            postData={postData}
          />

          {/* Inputs */}
          <PostInputContainer
            register={register}
            watch={watch}
            errors={errors}
            notionValidateState={notionValidateState}
            setNotionValidateState={setNotionValidateState}
            isUpdatedMod={!!postData}
            initialContentLink={postData?.contentLink || ''}
          />
          {/* Info */}
          <PostInfoContainer
            setValue={setValue}
            control={control}
            register={register}
            watch={watch}
            errors={errors}
          />
          {/* Tag */}
          <TagContainer placeholder="태그 입력 최대 개수는 10개까지 가능해요." />
          {/* calendar and Radio button */}
          <div className="flex gap-4">
            <CalendarContainer control={control} />

            <TitleContainer title="공개여부">
              <div className="flex h-[64px] items-center">
                <div className="flex space-x-4">
                  <Controller
                    name="isOpened"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <CustomRadio
                        values={isOpenRadios}
                        onChange={onChange}
                        value={value}
                        key={value}
                      />
                    )}
                  />
                </div>
              </div>
            </TitleContainer>
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="secondary"
              disabled={!isValid}
              onClick={handlePreview}
              className="w-[176px]"
            >
              미리보기
            </Button>
            <Button
              type="submit"
              variant="submit"
              disabled={!isValid}
              className="w-[176px]"
            >
              {postData ? '수정하기' : '게시하기'}
            </Button>
          </div>
        </PermissionBoard>
      </section>
    </form>
  );
};

const isOpenRadios: radioType[] = [
  { value: 'true', label: '공개' },
  {
    value: 'false',
    label: '비공개',
  },
];

export default PostFormContainer;
