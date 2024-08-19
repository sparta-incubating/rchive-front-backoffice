'use client';

import { useRoleCountDataQuery } from '@/api/admin/useQuery';
import { TapProps } from '@/types/admin.types';

const TapMenu = ({ onTabChange }: TapProps) => {
  const { countList } = useRoleCountDataQuery();
  console.log(countList, 'countList');

  const allCount = countList?.data?.statusAll;
  const approveCount = countList?.data?.statusApprove;
  const waitCount = countList?.data?.statusWait;

  return (
    <section className="h-[64px] w-full border border-b-2">
      <div className="ml-[36px] flex h-full flex-row gap-[20px] border">
        <div className="flex gap-[10px] border">
          <button onClick={() => onTabChange('All')}>전체</button>
          <p>{allCount}</p>
        </div>

        <div className="gap-[10px flex border">
          <button onClick={() => onTabChange('WAIT')}>대기 중</button>
          <p>{waitCount}</p>
        </div>

        <div className="flex gap-[10px] border">
          <button onClick={() => onTabChange('APPROVE')}>승인</button>
          <p>{approveCount}</p>
        </div>
      </div>
    </section>
  );
};

export default TapMenu;
