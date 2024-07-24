import { postThumbnailUpload } from '@/api/postApi';
import Button from '@/components/atoms/button';
import FormSpan from '@/components/atoms/formSpan';
import UploadThumbnail from '@/components/atoms/uploadThumbnail';
import UploadThumbnailText from '@/components/atoms/uploadThumbnailText';
import TitleContainer from '@/components/molecules/post/titleContainer';
import { PostsFormSchema } from '@/types/posts.types';
import { createToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface ThumbnailContainerProps {
  setValue: UseFormSetValue<PostsFormSchema>;
}

const ThumbnailContainer = ({ setValue }: ThumbnailContainerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUploadError, setFileUploadError] = useState<string | null>();
  const { mutate: thumbnailMutate, data } = useMutation({
    mutationFn: postThumbnailUpload,
  });

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const maxSize = 3 * 1024 * 1024;

      if (file.size <= maxSize) {
        setFileUploadError(null);
        thumbnailMutate(file);

        console.log({ data });
        setValue('imageUpload', file.name);
      } else {
        setFileUploadError('파일 사이즈는 3MB 이하만 업로드 가능합니다.');
        createToast('파일 사이즈는 3MB 이하만 업로드 가능합니다.', 'primary');
      }
    }
  };

  return (
    <TitleContainer title="썸네일">
      {/* thumbnail section */}
      <section className="flex gap-6">
        <UploadThumbnail>
          <UploadThumbnailText>썸네일</UploadThumbnailText>
          <UploadThumbnailText>자동 업로드</UploadThumbnailText>
        </UploadThumbnail>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/jpeg, image/png, image/jpg, image/bmp"
        />

        <div className="flex flex-col gap-2 text-sm text-gray-300">
          <span>이미지를 업로드하지 않은 경우 기본 이미지로 보여집니다.</span>
          <span>최대 이미지 용량: 3MB</span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="px-5 py-3"
              onClick={handleUploadButtonClick}
            >
              <span className="flex w-[66px] items-center justify-center">
                업로드
              </span>
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="px-5 py-3 text-primary-400"
            >
              <span className="flex w-[66px] items-center justify-center">
                삭제
              </span>
            </Button>
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
