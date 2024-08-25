'use client';

import { useRoleCountDataQuery } from '@/api/admin/useQuery';
import { TapProps } from '@/types/admin.types';

const TapMenu = ({ onTabChange, selectedTab }: TapProps) => {
  const { countList } = useRoleCountDataQuery();

  const allCount = countList?.data?.statusAll;
  const approveCount = countList?.data?.statusApprove;
  const waitCount = countList?.data?.statusWait;

  return (
    <section className="h-[65px] w-full border-b pt-[16px]">
      <div className="flex h-full flex-row gap-[6px]">
        <div
          className={`flex h-[48px] w-[104px] gap-[10px] px-[18px] py-[10px] ${selectedTab === 'All' ? `border-b-2 border-black` : ``}`}
        >
          <button onClick={() => onTabChange('All')}>
            <p
              className={`text-sm ${selectedTab === 'All' ? `font-semibold` : `font-normal`}`}
            >
              전체
            </p>
          </button>
          <p className="flex h-[28px] w-[33px] items-center justify-center rounded-lg bg-blue-55 p-[4px] text-sm font-semibold text-blue-400">
            {allCount}
          </p>
        </div>

        <div
          className={`flex h-[48px] w-[119px] gap-[10px] px-[18px] py-[10px] ${selectedTab === 'WAIT' ? `border-b-2 border-black` : ``}`}
        >
          <button onClick={() => onTabChange('WAIT')}>
            <p
              className={`text-sm ${selectedTab === 'WAIT' ? `font-semibold` : `font-normal`}`}
            >
              대기 중
            </p>
          </button>
          <p className="flex h-[28px] w-[33px] items-center justify-center rounded-lg bg-[#ff9900]/10 p-[4px] text-sm font-semibold text-[#FF9900]">
            {waitCount}
          </p>
        </div>

        <div
          className={`flex h-[48px] w-[105px] gap-[10px] px-[18px] py-[10px] ${selectedTab === 'APPROVE' ? `border-b-2 border-black` : ``}`}
        >
          <button onClick={() => onTabChange('APPROVE')}>
            <p
              className={`text-sm ${selectedTab === 'APPROVE' ? `font-semibold` : `font-normal`}`}
            >
              승인
            </p>
          </button>
          <p className="flex h-[28px] w-[33px] items-center justify-center rounded-lg bg-[#58b32e]/10 p-[4px] text-sm font-semibold text-success-green">
            {approveCount}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TapMenu;
