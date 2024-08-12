import board from '@/../public/assets/icons/board-rtan.svg';
import backofficeMain from '@/../public/assets/icons/dashboard.svg';
import permission from '@/../public/assets/icons/permission-rtan.svg';
import write from '@/../public/assets/icons/write-rtan.svg';
import Image from 'next/image';

const SignInDashBoard = () => {
  return (
    <section className="flex items-center justify-center pt-[138px]">
      <section className="relative">
        <article className="absolute bottom-[445.52px] left-[508px] h-[351.48px] w-[237.79px]">
          <Image
            src={permission}
            alt="게시물르탄이"
            width={237.79}
            height={107.61}
            className="mb-[14px] rounded-[14px] shadow-rtanBox"
          />
          <Image
            src={write}
            alt="권한르탄이"
            width={237.79}
            height={107.61}
            className="mb-[14px] rounded-[14px] shadow-rtanBox"
          />
          <Image
            src={board}
            alt="작성르탄이"
            width={237.79}
            height={107.61}
            className="rounded-[14px] shadow-rtanBox"
          />
        </article>
        <article className="mb-[31px] h-[80px] w-[330px]">
          <p className="text-2xl font-bold text-gray-700">
            르탄이의 아카이브에 올릴 자료들을 쉽고 편리하게 관리해보세요
          </p>
        </article>
        <article className="h-[663px] w-[736.43px]">
          <Image
            src={backofficeMain}
            alt="백오피스"
            width={1633}
            height={1486}
          />
        </article>
      </section>
    </section>
  );
};

export default SignInDashBoard;
