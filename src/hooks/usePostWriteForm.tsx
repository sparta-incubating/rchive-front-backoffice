import { getNotionPageData, postDataPost } from '@/api/client/postApi';
import { useTagContext } from '@/context/useTagContext';
import useLoadingProgress from '@/hooks/useLoadingProgress';
import { useAppSelector } from '@/redux/storeConfig';
import {
  postsEndPointFormData,
  PostsFormSchema,
  TrackType,
} from '@/types/posts.types';
import { extractPageId } from '@/utils/notionAPI';
import { createToast } from '@/utils/toast';
import { postsSchema } from '@/validators/posts/posts.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const usePostWriteForm = () => {
  const {
    trackRole,
    period: loginPeriod,
    trackName,
  } = useAppSelector((state) => state.authSlice);

  const { setIsSubmitLoading, setLoadingMessage } = useLoadingProgress();

  const { tags } = useTagContext();

  const [notionValidateState, setNotionValidateState] =
    useState<boolean>(false);

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<PostsFormSchema>({
    resolver: zodResolver(postsSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      tutor: null,
      thumbnailUrl: '',
      contentLink: '',
      videoLink: '',
      tagNameList: [],
      uploadedAt: null,
      trackName: trackName as TrackType,
      postPeriod: trackRole === 'APM' ? loginPeriod : '',
      isOpened: 'true',
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
    const formData: postsEndPointFormData = {
      postType: data.postType,
      title: data.title,
      tagNameList: tags.map((tag) => tag.tagName),
      tutorId: Number(tutor?.tutorId),
      postPeriod: Number(data.postPeriod),
      isOpened: Boolean(data.isOpened),
      uploadedAt: dayjs(data.uploadedAt).format('YYYY-MM-DD'),
      // notion content api route 요청
      content: contentLink
        ? (await getNotionPageData(extractPageId(contentLink!)!)) || ''
        : '',
      contentLink: data.contentLink || '',
      videoLink: data.videoLink || '',
      thumbnailUrl: data.thumbnailUrl || '',
    };
    setLoadingMessage('데이터를 서버에 등록 중...');

    await postDataPost(watch('trackName'), 0, formData);

    setIsSubmitLoading(false);
    createToast('게시물 등록이 완료되었습니다.', 'primary');
  };

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
    isValid,
  };
};

export default usePostWriteForm;
