import { getNotionPageData } from '@/api/postApi';
import { useTagContext } from '@/context/tag.context';
import { PostsFormSchema } from '@/types/posts.types';
import { extractPageId } from '@/utils/notionAPI';
import { postsSchema } from '@/validators/posts/posts.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const usePostWriteForm = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
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

  const onSubmit = async (data: PostsFormSchema) => {
    setIsSubmitLoading(true);
    const { tutor, contentLink } = data;

    // notion link에 입력이 되었지만 유효성 검사가 false일 때 submit 불가
    if (contentLink && !notionValidateState) {
      alert(
        '링크 유효성 검사가 진행되지 않았거나 잘못된 링크입니다. 확인하시고 다시 요청바랍니다.',
      );
    }

    // tag
    const formData = {
      ...data,
      tagNameList: tags.map((tag) => tag.tagName),
      tutor: tutor?.tutorId,
      // notion content api route 요청
      content: await getNotionPageData(extractPageId(contentLink!)!),
    };

    console.log({ formData });
    setIsSubmitLoading(false);
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
    isSubmitLoading,
  };
};

export default usePostWriteForm;
