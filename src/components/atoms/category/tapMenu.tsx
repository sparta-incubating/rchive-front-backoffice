'use client';

import { useMemo } from 'react';

type TabProps = {
  data: {
    id: number;
    title: string;
    className: string;
    bgColor: string;
    textColor: string;
  }[];
  activeTab: number;
  setActiveTab: (idx: number) => void;
  listData: any[];
};

const TapMenu = ({ data, activeTab, setActiveTab, listData }: TabProps) => {
  // 각 탭에 해당하는 아이템 갯수를 계산
  const tabCounts = useMemo(() => {
    const counts = [listData.length, 0, 0]; // 전체, 대기 중, 승인 순서
    listData.forEach((item) => {
      if (item.permission === '대기') counts[1]++;
      else if (item.permission === '승인') counts[2]++;
    });
    return counts;
  }, [listData]);

  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
  };

  return (
    <section className="h-[64px] w-full border-b-2">
      <div className="ml-[36px] flex gap-[6px] pt-[16px]">
        {data.map((item, idx) => (
          <button
            className={`flex h-[48px] items-center justify-center gap-[10px] border-b-2 ${item.className} ${
              activeTab === idx ? 'border-gray-900' : ''
            }`}
            key={item.id}
            type="button"
            onClick={() => handleTabChange(idx)}
          >
            <p className="h-[20px] text-sm">{item.title}</p>
            <div
              className={`flex h-[28px] w-[33px] items-center justify-center ${item.bgColor} rounded-[8px]`}
            >
              <p className={item.textColor}>{tabCounts[idx]}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TapMenu;
