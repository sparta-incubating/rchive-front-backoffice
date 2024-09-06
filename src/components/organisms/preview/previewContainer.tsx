import Button from '@/components/atoms/button';
import { ReactNode } from 'react';

interface PreviewContainerProps {
  children: ReactNode;
  onClose: () => void;
  onSubmit: () => void;
}

const PreviewContainer = ({
  children,
  onClose,
  onSubmit,
}: PreviewContainerProps) => {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-2 border border-b-gray-100 bg-blue-50 py-4">
        <h1 className="text-center text-2xl font-bold">미리보기 화면입니다.</h1>
        <p className="text-center text-lg font-normal">
          영상자료/노션자료를 모두 업로드한 경우에는 탭 기능동작(클릭)을
          제공합니다.
        </p>
      </section>

      <section className="m-6 flex overflow-scroll border border-gray-200">
        {children}
      </section>

      <section className="flex flex-col gap-2 border border-t-gray-100 bg-blue-50 py-4">
        <div className="flex items-center justify-center gap-5">
          <Button variant="secondary" size="sm" onClick={onClose}>
            닫기
          </Button>
          <Button variant="submit" size="sm" onClick={onSubmit}>
            게시하기
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PreviewContainer;
