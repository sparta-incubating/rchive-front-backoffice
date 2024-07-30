import nonRrtan from '@/../../public/assets/icons/nonData-rtan.svg';
import Image from 'next/image';

const NoDataList = () => {
  return (
    <article className="mx-auto my-[202px] flex w-[324px] flex-col justify-center gap-[20px]">
      <p className="text-center text-lg text-gray-600">
        아직 요청된 내역이 없어요.
      </p>
      <figure className="flex justify-center">
        <Image src={nonRrtan} width={66} height={64} alt="르탄이" />
      </figure>
    </article>
  );
};

export default NoDataList;
