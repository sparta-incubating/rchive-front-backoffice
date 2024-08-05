import { getNotionPageData, postDataPost } from '@/api/postApi';
import ProgressModal from '@/components/pages/progressModal';
import { useModalContext } from '@/context/modal.context';
import { useTagContext } from '@/context/tag.context';
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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const usePostWriteForm = () => {
  const {
    trackRole,
    period: loginPeriod,
    trackName,
  } = useAppSelector((state) => state.authSlice);

  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [LoadingMessage, setLoadingMessage] = useState<string>('');
  const { tags } = useTagContext();
  const { open, close } = useModalContext();

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

  // loading modal을 제어하는 useEffect
  useEffect(() => {
    if (isSubmitLoading)
      open(<ProgressModal>{LoadingMessage}</ProgressModal>, false);
    else if (!isSubmitLoading) close();
  }, [isSubmitLoading, open, close, LoadingMessage]);

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
