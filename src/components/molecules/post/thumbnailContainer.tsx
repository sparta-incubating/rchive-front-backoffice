import Button from '@/components/atoms/button';
import UploadThumbnail from '@/components/atoms/uploadThumbnail';
import UploadThumbnailText from '@/components/atoms/uploadThumbnailText';
import TitleContainer from '@/components/molecules/post/titleContainer';
import { PostsFormSchema } from '@/types/posts.types';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface ThumbnailContainerProps {
  register: UseFormRegister<PostsFormSchema>;
  watch: UseFormWatch<PostsFormSchema>;
}

const ThumbnailContainer = ({ register, watch }: ThumbnailContainerProps) => {
  return (
    <TitleContainer title="썸네일">
      {/* thumbnail section */}
      <section className="flex gap-6">
        <UploadThumbnail>
          <UploadThumbnailText>썸네일</UploadThumbnailText>
          <UploadThumbnailText>자동 업로드</UploadThumbnailText>
        </UploadThumbnail>
        <div className="flex flex-col gap-2 text-sm text-gray-300">
          <span>이미지를 업로드하지 않은 경우 기본 이미지로 보여집니다.</span>
          <span>최대 이미지 용량: 3MB</span>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="px-5 py-3">
              <span className="flex w-[66px] items-center justify-center">
                업로드
              </span>
            </Button>
            <Button
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
    </TitleContainer>
  );
};

export default ThumbnailContainer;
