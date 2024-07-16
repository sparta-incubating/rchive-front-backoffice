import UploadThumbnail from '@/components/atoms/uploadThumbnail';
import UploadThumbnailText from '@/components/atoms/uploadThumbnailText';

const ThumbnailContainer = () => {
  return (
    <section className="flex flex-col">
      <div className="flex items-center py-2">
        <span className="text-base font-medium">썸네일</span>
      </div>
      <UploadThumbnail>
        <UploadThumbnailText>썸네일</UploadThumbnailText>
        <UploadThumbnailText>자동 업로드</UploadThumbnailText>
      </UploadThumbnail>
    </section>
  );
};

export default ThumbnailContainer;
