import Button from '@/components/atoms/button';
import SocialButton from '@/components/atoms/postDetail/socialButton';
import { PropsWithChildren } from 'react';

const PreviewContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-2 border border-b-gray-100 bg-blue-50 py-4">
        <h1 className="text-center text-2xl font-bold">미리보기 화면입니다.</h1>
        <p className="text-center text-lg font-normal">
          영상자료/노션자료를 모두 업로드한 경우에는 탭 기능동작(클릭)을
          제공합니다.
        </p>
      </section>
      <section>
        <SocialButton image="/assets/icons/bookmark.svg" />
        <SocialButton image="/assets/icons/comment.svg" />
        {children}
      </section>
      <section className="flex flex-col gap-2 border border-t-gray-100 bg-blue-50 py-4">
        <div className="flex items-center justify-center gap-5">
          <Button variant="secondary" size="sm">
            닫기
          </Button>
          <Button variant="submit" size="sm">
            게시하기
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PreviewContainer;
