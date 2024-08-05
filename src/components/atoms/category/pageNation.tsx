'use client';
import init from '@/../public/assets/icons/initPage.svg';
import nonNext from '@/../public/assets/icons/nonNext.svg';
import Image from 'next/image';

const PageNation = () => {
  return (
    <section className="mx-auto h-[32px] w-[1012px] border">
      <div className="flex flex-row justify-center">
        <button>
          <Image src={init} width={32} height={32} alt="페이지네이션" />
        </button>
        <div className="flex h-[32px] w-[32px] items-center rounded-full bg-blue-55">
          <p className="w-[32px] text-center">1</p>
        </div>

        {/* <button>
          <Image src={prev} width={32} height={32} alt="페이지네이션" />
        </button>

        <button>
          <Image src={end} width={32} height={32} alt="페이지네이션" />
        </button>

        <button>
          <Image src={next} width={32} height={32} alt="페이지네이션" />
        </button> */}
        <button>
          <Image src={nonNext} width={32} height={32} alt="페이지네이션" />
        </button>
      </div>
    </section>
  );
};

export default PageNation;
