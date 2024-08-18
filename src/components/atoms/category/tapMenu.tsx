'use client';

import { PermissionInfoType } from '@/api/permission/permissionApi';
import {
  usePermissionDataQuery,
  useRoleCountDataQuery,
} from '@/api/permission/useQuery';
import AuthFilteredList from '@/components/pages/admin/AuthFilteredList';
import { useState } from 'react';

const TapMenu = () => {
  const { boardList } = usePermissionDataQuery();
  const { countList } = useRoleCountDataQuery();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const allCount = countList?.data?.statusAll;
  const approveCount = countList?.data?.statusApprove;
  const waitCount = countList?.data?.statusWait;

  const testData = boardList?.data?.content;
  const filteredData =
    selectedCategory === 'All'
      ? testData
      : testData.filter(
          (item: PermissionInfoType) => item.auth === selectedCategory,
        );

  return (
    <section>
      <div>
        <button onClick={() => setSelectedCategory('All')}>
          전체 {allCount}
        </button>
        <button onClick={() => setSelectedCategory('WAIT')}>
          대기중 {approveCount}
        </button>
        <button onClick={() => setSelectedCategory('APPROVE')}>
          승인 {waitCount}
        </button>
      </div>

      {/* 필터링된 데이터 표시 */}
      <AuthFilteredList data={filteredData} />
    </section>
  );
};

export default TapMenu;
