import { useTagContext } from '@/context/tag.context';
import { PostsFormSchema } from '@/types/posts.types';
import { postsSchema } from '@/validators/posts/posts.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const usePostWriteForm = () => {
  const { tags } = useTagContext();
  const [notionValidateState, setNotionValidateState] =
    useState<boolean>(false);

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
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
      uploadedAt: new Date(),
      trackName: 'ANDROID',
      period: '',
      isOpened: 'true',
    },
  });

  const onSubmit = (data: PostsFormSchema) => {
    console.log('form data = ', data);
    const {
      title,
      tutor,
      thumbnailUrl,
      contentLink,
      videoLink,
      tagNameList,
      uploadedAt,
      trackName,
      period,
      isOpened,
    } = data;

    // notion link에 입력이 되었지만 유효성 검사가 false일 때 submit 불가
    if (contentLink && !notionValidateState) {
      alert(
        '링크 유효성 검사가 진행되지 않았거나 잘못된 링크입니다. 확인하시고 다시 요청바랍니다.',
      );
    }
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
  };
};

export default usePostWriteForm;
