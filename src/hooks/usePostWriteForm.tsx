'use client';

import {
  getNotionPageData,
  patchDataPost,
  postDataPost,
} from '@/api/client/postApi';
import { PostForm } from '@/class/postForm';
import { useTagContext } from '@/context/useTagContext';
import useLoadingProgress from '@/hooks/useLoadingProgress';
import { useAppSelector } from '@/redux/storeConfig';
import { postFetchData, PostsFormSchema } from '@/types/posts.types';
import { extractPageId } from '@/utils/notion/notionAPI';
import { createToast } from '@/utils/toast';
import { postsSchema } from '@/validators/posts/posts.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const usePostWriteForm = (postData?: postFetchData) => {
  const {
    trackRole,
    period: loginPeriod,
    trackName,
  } = useAppSelector((state) => state.authSlice);

  const { setIsSubmitLoading, setLoadingMessage } = useLoadingProgress();

  const { tags, addTag, clearTags } = useTagContext();

  const [notionValidateState, setNotionValidateState] =
    useState<boolean>(false);
  const [customIsValid, setCustomIsValid] = useState(false);

  const router = useRouter();
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid: formIsValid },
  } = useForm<PostsFormSchema>({
    resolver: zodResolver(postsSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      tutor: undefined,
      thumbnailUrl: '',
      contentLink: '',
      videoLink: '',
      tagNameList: [],
      uploadedAt: null,
      trackName: trackName,
      postPeriod: trackRole === 'APM' ? loginPeriod : '',
      isOpened: 'false',
    },
  });

  const onSubmit = async (data: PostsFormSchema) => {
    const { tutor, contentLink } = data;

    // notion link에 입력이 되었지만 유효성 검사가 false일 때 submit 불가
    if (contentLink && !notionValidateState) {
      createToast(
        '링크 유효성 검사가 진행되지 않았거나 잘못된 링크입니다. 확인하시고 다시 요청바랍니다.',
        'primary',
      );
      return;
    }

    setIsSubmitLoading(true);
    setLoadingMessage('노션 자료를 찾아오는 중...');
    const formData = new PostForm(
      data.postType,
      data.title,
      tags.map((tag) => tag.tagName),
      Number(tutor?.tutorId),
      Number(data.postPeriod),
      data.isOpened === 'true',
      dayjs(data.uploadedAt).format('YYYY-MM-DD'),
      contentLink ? await getNotionPageData(extractPageId(contentLink)!) : '',
      data.contentLink,
      data.videoLink,
      data.thumbnailUrl,
    );

    setLoadingMessage('데이터를 서버에 등록 중...');
    try {
      if (!postData) {
        await postDataPost(watch('trackName'), Number(loginPeriod), formData);
        createToast('게시물 등록이 완료되었습니다.', 'primary');
      } else {
        await patchDataPost(
          watch('trackName'),
          Number(loginPeriod),
          formData,
          Number(postData.postId),
        );
        createToast('게시물 수정이 완료되었습니다.', 'primary');
      }
    } catch (error) {
      if (!postData) {
        createToast('게시물 등록 중 오류가 발생했습니다.', 'warning');
      } else {
        createToast('게시물 수정 중 오류가 발생했습니다.', 'warning');
      }
    } finally {
      router.push('/posts');
      setIsSubmitLoading(false);
      router.refresh();
    }
  };

  useEffect(() => {
    if (postData) {
      setValue('thumbnailUrl', postData.thumbnailUrl || '');
      setValue('title', postData.title);
      setValue('contentLink', postData.contentLink);
      setNotionValidateState(!!postData.contentLink);
      setValue('videoLink', postData.videoLink);
      setValue('postPeriod', String(postData.period));
      setValue('postType', postData.postType.key);
      setValue('uploadedAt', dayjs(postData.uploadedAt).toDate());
      setValue('tutor', { ...postData.tutorRes });
      setValue('isOpened', String(postData.isOpened) as 'true' | 'false');

      clearTags(); // 기존 태그 초기화
      if (postData.tagNameList.length > 0) {
        // Promise.all로 모든 태그 추가 작업이 완료될 때까지 기다립니다.
        Promise.all(
          postData.tagNameList.map((tag) => {
            addTag(tag as string);
          }),
        ).then(() => {
          setValue('tagNameList', tags); // 모든 태그가 추가된 후 설정
        });
      }
    }
  }, [setValue]);

  const tutor = watch('tutor');
  const contentLink = watch('contentLink');
  const videoLink = watch('videoLink');
  const uploadedAt = watch('uploadedAt');
  useEffect(() => {
    setCustomIsValid(
      formIsValid && !!(contentLink || videoLink) && !!uploadedAt && !!tutor,
    );
  }, [contentLink, videoLink, uploadedAt, formIsValid, tutor]);

  useEffect(() => {
    trigger('tutor');
  }, [trigger, tutor]);

  return {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    errors,
    onSubmit,
    notionValidateState,
    setNotionValidateState,
    isValid: customIsValid,
  };
};

export default usePostWriteForm;
