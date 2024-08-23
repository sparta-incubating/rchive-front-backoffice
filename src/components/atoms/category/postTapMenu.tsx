'use client';

import { PostTabType } from '@/types/posts.types';

type TabProps = {
  data: PostTabType[];
  activeTab: string;
  setActiveTab: (idx: string) => void;
};

const PostTapMenu = ({ data, activeTab, setActiveTab }: TabProps) => {
  const handleTabChange = (idx: string) => {
    setActiveTab(idx);
  };

  return (
    <section className="h-[64px] w-full border-b">
      <div className="ml-[36px] flex gap-3.5 pt-[16px]">
        {data?.map((item) => (
          <button
            className={`flex h-[48px] items-center justify-center gap-[10px] border-b font-light ${
              activeTab === item.id && 'border-gray-900'
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