import { useTagContext } from '@/context/tag.context';
import { PostsFormSchema } from '@/types/posts.types';
import { postsSchema } from '@/validators/posts/posts.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const usePostWriteForm = () => {
  const { tags } = useTagContext();

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
      thumbnail: '',
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
  };

  return {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    errors,
    onSubmit,
  };
};

export default usePostWriteForm;
