import {
  deletePost,
  deleteThumbnailDeletePost,
  getThumbnailDelete,
  postThumbnailUpload,
} from '@/api/client/postApi';
import Button from '@/components/atoms/button';
import Confirm from '@/components/atoms/confirm';
import FormSpan from '@/components/atoms/formSpan';
import UploadThumbnail from '@/components/atoms/uploadThumbnail';
import UploadThumbnailText from '@/components/atoms/uploadThumbnailText';
import TitleContainer from '@/components/molecules/post/titleContainer';
import { useConfirmContext } from '@/context/useConfirmContext';
import { useAppSelector } from '@/redux/storeConfig';
import { postFetchData, PostsFormSchema } from '@/types/posts.types';
import { createToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface ThumbnailContainerProps {
  setValue: UseFormSetValue<PostsFormSchema>;
  initValue?: string;
  postData?: postFetchData;
}

const ThumbnailContainer = ({
  setValue,
  initValue,
  postData,
}: ThumbnailContainerProps) => {
  const { trackName, period: loginPeriod } = useAppSelector(
    (state) => state.authSlice,
  );
  const router = useRouter();
  const [uploadState, setUploadState] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUploadError, setFileUploadError] = useState<string | null>();
  const confirm = useConfirmContext();

  const { mutate: thumbnailMutate, data } = useMutation({
    mutationFn: postThumbnailUpload,
    onSuccess: (data) => {
      setUploadState(true);
      setValue('thumbnailUrl', data.data);
    },
  });
  const { mutate: thumbnailDeletePostUpdateMutate } = useMutation({
    mutationFn: deleteThumbnailDeletePost,
  });

  const { mutate: thumbnailDeleteMutate } = useMutation({
    mutationFn: getThumbnailDelete,
    onSuccess: () => {
      setUploadState(false);
      setValue('thumbnailUrl', '');
      if (postData?.postId) {
        thumbnailDeletePostUpdateMutate({
          trackName,
          period: Number(loginPeriod),
          postId: postData.postId,
        });
      }
    },
  });

  const handleUploadThumbnail = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const maxSize = 3 * 1024 * 1024;

      // 허용된 이미지 형식 목록
      const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp'];

      if (!allowedTypes.includes(file.type)) {
        setFileUploadError('이미지 형식만 업로드 가능합니다.');
        createToast('이미지 형식만 업로드 가능합니다.', 'warning');
        return;
      }

      if (file.size <= maxSize) {
        setFileUploadError(null);
        thumbnailMutate(file);
      } else {
        setFileUploadError('파일 사이즈는 3MB 이하만 업로드 가능합니다.');
        createToast('파일 사이즈는 3MB 이하만 업로드 가능합니다.', 'primary');
      }
    }
  };

  const handleDeleteThumbnail = () => {
    thumbnailDeleteMutate(data?.data || initValue);
  };

  const handleDeletePost = async (postId: string) => {
    const result = await confirm.handleConfirm(
      <Confirm text="삭제">
        <div className="flex flex-col gap-2.5">
          <span className="text-center text-xl font-bold">
            게시물을 삭제하시겠어요?
          </span>
          <span className="text-md text-center font-medium text-gray-600">
            삭제할 경우 다시 복구할 수 없어요.
          </span>
        </div>
      </Confirm>,
      false,
    );

    if (result) {
      const response = await deletePost(trackName, Number(loginPeriod), postId);
      createToast(response.message, 'primary');
      router.push('/posts');
      router.refresh();
    } else {
      console.log('삭제 취소');
    }
  };

  useEffect(() => {
    if (initValue) {
      setUploadState(true);
    }
  }, [initValue]);

  return (
    <TitleContainer title="썸네일">
      {!!postData && (
        <div className="absolute right-0 top-0">
          <button
            type="button"
            className="text-md font-semibold text-primary-400"
            onClick={() => handleDeletePost(postData?.postId)}
          >
            삭제하기
          </button>
        </div>
      )}

      {/* thumbnail section */}
      <section className="flex gap-6">
        {!uploadState ? (
          <UploadThumbnail variant="image">
            <UploadThumbnailText>기본 이미지</UploadThumbnailText>
          </UploadThumbnail>
        ) : (
          <UploadThumbnail variant="image">
            <img
              src={data?.data || initValue}
              alt={'upload image'}
              className="object-fill"
            />
          </UploadThumbnail>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/jpeg, image/png, image/jpg, image/bmp"
        />

        <div className="flex flex-col gap-2 text-sm text-gray-300">
          <div className="flex flex-col">
            <span>이미지를 업로드하지 않은 경우 기본 이미지로 보여집니다.</span>
            <span>최대 이미지 용량: 3MB</span>
          </div>
          <div className="flex gap-2">
            {!uploadState ? (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="px-5 py-3"
                onClick={handleUploadThumbnail}
              >
                <span className="flex w-[66px] items-center justify-center">
                  업로드
                </span>
              </Button>
            ) : (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="px-5 py-3 text-primary-400"
                onClick={handleDeleteThumbnail}
              >
                <span className="flex w-[66px] items-center justify-center">
                  삭제
                </span>
              </Button>
            )}
          </div>
        </div>
      </section>
      {fileUploadError && (
        <FormSpan variant="error">{fileUploadError}</FormSpan>
      )}
    </TitleContainer>
  );
};

export default ThumbnailContainer;
