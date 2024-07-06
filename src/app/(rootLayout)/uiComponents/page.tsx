import Button from '@/components/atoms/button';
import UploadThumbnail from '@/components/atoms/uploadThumbnail';
import UploadThumbnailText from '@/components/atoms/uploadThumbnailText';
import UploadContainer from '@/components/molecules/uploadContainer';

const UiComponents = () => {
  return (
    <>
      <div className="text-6xl font-bold">르탄이의 아카이브</div>
      <div className="text-[50px] font-bold">르탄이의 아카이브</div>
      <div className="text-5xl font-bold">르탄이의 아카이브</div>
      <div className="text-[40px] font-bold">르탄이의 아카이브</div>
      <div>
        <Button>primary</Button>
        <Button disabled={true}>primary</Button>
        <Button size="sm">primary</Button>
        <Button size="sm" className="w-[300px] bg-amber-500">
          primary
        </Button>
      </div>
      <div>
        <Button variant="secondary">secondary</Button>
        <Button variant="secondary" disabled={true}>
          secondary
        </Button>
        <Button variant="secondary" size="sm">
          secondary
        </Button>
      </div>
      <div>
        <Button variant="submit">submit</Button>
        <Button variant="submit" disabled={true}>
          submit
        </Button>
        <Button variant="submit" size="sm">
          submit
        </Button>
      </div>

      <div>
        <h1>Thumbnail test</h1>
        <UploadThumbnail>
          <UploadThumbnailText>썸네일</UploadThumbnailText>
          <UploadThumbnailText>자동 업로드</UploadThumbnailText>
        </UploadThumbnail>
        <UploadThumbnail variant={'image'}>
          <img
            src={'/assets/test/img.png'}
            alt={'test img'}
            className="object-fill"
          />
        </UploadThumbnail>

        <UploadContainer />
      </div>
    </>
  );
};

export default UiComponents;
