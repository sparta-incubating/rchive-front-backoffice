import { TapProps } from '@/types/admin.types';

const TapMenu = ({ onTabChange, selectedTab, countList }: TapProps) => {
  const allCount = countList?.data?.statusAll || 0;
  const approveCount = countList?.data?.statusApprove || 0;
  const waitCount = countList?.data?.statusWait || 0;

  const handleTabClick = (tab: string) => {
    onTabChange(tab);
  };

  return (
    <section className="h-[65px] w-full border-b">
      <div className="flex h-full flex-row gap-[6px]">
        <div
          className={`flex w-[104px] items-center gap-[10px] px-[18px] py-[10px] ${selectedTab === 'All' ? `border-b-2 border-black` : ``}`}
        >
          <button
            onClick={() => handleTabClick('All')}
            className="flex gap-2.5"
          >
            <p
              className={`pt-[4px] text-sm ${selectedTab === 'All' ? `font-semibold` : `font-normal`}`}
            >
              전체
            </p>
            <p className="flex h-[28px] w-[33px] items-center justify-center rounded-lg bg-blue-55 p-[4px] text-sm font-semibold text-blue-400">
              {allCount}
            </p>
          </button>
        </div>

        <div
          className={`flex w-[119px] items-center gap-[10px] px-[18px] py-[10px] ${selectedTab === 'WAIT' ? `border-b-2 border-black` : ``}`}
        >
          <button
            onClick={() => handleTabClick('WAIT')}
            className="flex gap-2.5"
          >
            <p
              className={`pt-[4px] text-sm ${selectedTab === 'WAIT' ? `font-semibold` : `font-normal`}`}
            >
              대기 중
            </p>
            <p className="flex h-[28px] w-[33px] items-center justify-center rounded-lg bg-[#ff9900]/10 p-[4px] text-sm font-semibold text-[#FF9900]">
              {waitCount}
            </p>
          </button>
        </div>

        <div
          className={`flex w-[105px] items-center gap-[10px] px-[18px] py-[10px] ${selectedTab === 'APPROVE' ? `border-b-2 border-black` : ``}`}
        >
          <button
            onClick={() => handleTabClick('APPROVE')}
            className="flex gap-2.5"
          >
            <p
              className={`pt-[4px] text-sm ${selectedTab === 'APPROVE' ? `font-semibold` : `font-normal`}`}
            >
              승인
            </p>
            <p className="flex h-[28px] w-[33px] items-center justify-center rounded-lg bg-[#58b32e]/10 p-[4px] text-sm font-semibold text-success-green">
              {approveCount}
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TapMenu;
