'use client';

import {
  getNotionPageData,
  patchDataPost,
  postDataPost,
  postTag,
} from '@/api/client/postApi';
import { revalidatePostsAction } from '@/app/actions/serverActions';
import { PostForm } from '@/class/postForm';
import { useTagContext } from '@/context/useTagContext';
import useLoadingProgress from '@/hooks/useLoadingProgress';
import { useAppSelector } from '@/redux/storeConfig';
import { postFetchData, PostsFormSchema } from '@/types/posts.types';
import { TagType } from '@/types/tag.types';
import { extractPageId } from '@/utils/notion/notionAPI';
import { createToast } from '@/utils/toast';
import { postsSchema } from '@/validators/posts/posts.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { isEqual } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const usePostWriteForm = (postData?: postFetchData) => {
  const {
    trackRole,
    period: loginPeriod,
    trackName,
  } = useAppSelector((state) => state.authSlice);

  const { setIsSubmitLoading, setLoadingMessage } = useLoadingProgress();

  const { tags, addTag, clearTags, setTags } = useTagContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [notionValidateState, setNotionValidateState] =
    useState<boolean>(false);
  const [customIsValid, setCustomIsValid] = useState(false);
  const [tagsChanged, setTagsChanged] = useState(false);
  const initialTagsRef = useRef<TagType[]>([]);

  const { mutate: postTagsMutate } = useMutation({ mutationFn: postTag });

  const router = useRouter();
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid: formIsValid, isDirty },
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

    try {
      setIsSubmitting(true);
      setIsSubmitLoading(true);
      setLoadingMessage('노션 자료를 찾아오는 중...');
      const fetchTags = tags.map((tag) => tag.tagName);

      const formData = new PostForm(
        data.postType,
        data.title,
        fetchTags,
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

      // 등록 및 수정에서는 tag 등록이 필수이기떄문에
      postTagsMutate(fetchTags, {
        onError: (error) => {
          createToast(`태그 저장 중 오류가 발생했습니다.`, 'warning');
          throw new Error('태그 저장에 실패했습니다.');
        },
      });

      if (!postData) {
        //todo: post, update react-query로 변경 필요
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

      // server action
      await revalidatePostsAction('/posts');
      router.push('/posts');
    } catch (error) {
      setIsSubmitting(false);
      if (axios.isAxiosError(error)) {
        if (!postData) {
          createToast(
            error.response?.data.message
              ? error.response?.data.message
              : `게시물 등록 중 오류가 발생했습니다.`,
            'warning',
          );
        } else {
          createToast(
            error.response?.data.message
              ? error.response?.data.message
              : `게시물 수정 중 오류가 발생했습니다.`,
            'warning',
          );
        }
      }
    } finally {
      // setIsSubmitting(false);
      setIsSubmitLoading(false);
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

      if (postData.tagNameList.length > 0) {
        clearTags();
        const initTags: TagType[] = postData.tagNameList.map((tag) => ({
          tagId: uuidv4(),
          tagName: tag,
        }));
        setTags(initTags);
        initialTagsRef.current = initTags;
        setValue('tagNameList', initTags);
      }
    }
  }, []);

  useEffect(() => {
    if (postData) {
      const currentTags = tags.map((tag) => tag.tagName);
      const initialTags = initialTagsRef.current.map((tag) => tag.tagName);
      setTagsChanged(!isEqual(currentTags, initialTags));
    }
  }, [tags, postData]);

  const tutor = watch('tutor');
  const contentLink = watch('contentLink');
  const videoLink = watch('videoLink');
  const uploadedAt = watch('uploadedAt');
  useEffect(() => {
    if (postData) {
      setCustomIsValid(
        (formIsValid &&
          !!(contentLink || videoLink) &&
          !!uploadedAt &&
          !!tutor) ||
          tagsChanged,
      );
    } else {
      setCustomIsValid(
        formIsValid && !!(contentLink || videoLink) && !!uploadedAt && !!tutor,
      );
    }
  }, [
    contentLink,
    videoLink,
    uploadedAt,
    formIsValid,
    tutor,
    tagsChanged,
    postData,
  ]);

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
    isDirty,
    isSubmitting,
  };
};

export default usePostWriteForm;
