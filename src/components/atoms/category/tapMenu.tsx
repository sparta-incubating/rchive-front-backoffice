'use client';

import { useState } from 'react';

type TabProps = {
  data: {
    id: number;
    title: string;
    className: string;
    count?: number;
  }[];
  activeTab: number;
  setActiveTab: (idx: number) => void;
};

const TapMenu = ({ data, activeTab, setActiveTab }: TabProps) => {
  const [isActive, setIsActive] = useState(activeTab);

  // 현재 활성화된 탭에 따라 갯수를 업데이트
  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    setIsActive(idx);
  };

  return (
    <section className="h-[64px] w-full border-b-2">
      <div className="ml-[36px] flex gap-[6px] pt-[16px]">
        {/* 1 */}
        {data &&
          data.map((item, idx) => {
            return (
              <button
                className={`flex h-[48px] items-center justify-center gap-[10px] border-b-2 ${item.className} ${
                  activeTab === idx ? 'border-gray-900' : ''
                }`}
                key={item.id}
                type="button"
                onClick={() => handleTabChange(idx)}
              >
                <p className="h-[20px] text-sm">{item.title}</p>
                {item.count !== undefined && (
                  <div
                    className={`flex h-[28px] w-[33px] items-center justify-center ${item?.bgColor} rounded-[8px]`}
                  >
                    <p className={item?.textColor}>{item.count}</p>
                  </div>
                )}
              </button>
            );
          })}
      </div>
      <div className="p-[16px]">{data[isActive]?.content}</div>
    </section>
  );
};

export default TapMenu;
