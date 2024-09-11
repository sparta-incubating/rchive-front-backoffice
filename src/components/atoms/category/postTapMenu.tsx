'use client';

import usePostTypeNames from '@/hooks/usePostTypeNames';
import { PostTabType } from '@/types/posts.types';
import { useEffect, useState } from 'react';

type TabProps = {
  activeTab: string;
  setActiveTab: (idx: string) => void;
};

const PostTapMenu = ({ activeTab, setActiveTab }: TabProps) => {
  const [tapData, setTapData] = useState<PostTabType[]>([]);
  const handleTabChange = (idx: string) => {
    setActiveTab(idx);
  };

  const { postTypeNames } = usePostTypeNames();
  useEffect(() => {
    if (postTypeNames?.data) {
      setTapData([
        { id: 'all', title: '전체' },
        ...postTypeNames.data
          .filter((postType) => postType.key !== 'Level_All')
          .map((item) => ({
            id: item.key,
            title: item.value,
          })),
      ]);
    }
  }, [postTypeNames]);

  return (
    <section className="h-[64px] w-full border-b">
      <div className="flex gap-3.5 pt-[16px]">
        {tapData?.map((item) => (
          <button
            className={`flex h-[48px] items-center justify-center gap-[10px] border-b px-[12px] font-light ${
              activeTab === item.id && 'border-b-2 border-gray-900'
            }`}
            key={item.title}
            type="button"
            onClick={() => handleTabChange(item.id)}
          >
            <p
              className={`h-[20px] text-sm ${activeTab === item.id && 'font-bold'}`}
            >
              {item.title}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default PostTapMenu;
