import Image from 'next/image';

const NotionLink = ({ notionLink }: { notionLink: string }) => {
  return (
    <div className="flex h-[58px] w-[814px] items-center justify-center gap-2.5 rounded-[8px] border border-blue-100 bg-blue-55">
      <p className="text-md font-medium">
        첨부된 영상이 보이지 않을 경우 노션에서 확인해주세요!
      </p>
      <a href={notionLink} target="_blank">
        <div className="flex">
          <span className="text-md font-bold text-secondary-500">바로가기</span>
          <div className="relative">
            <Image
              src="/assets/icons/arrowOutward.svg"
              alt="external link"
              width={20}
              height={20}
            />
          </div>
        </div>
      </a>
    </div>
  );
};

export default NotionLink;
