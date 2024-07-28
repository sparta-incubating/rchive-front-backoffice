'use client';
import { useState } from 'react';

const TapMenu = () => {
  const TabData = [
    { id: 1, button: '전체', content: '전체 조회' },
    { id: 2, button: '대기 중', content: '대기 중 조회' },
    { id: 3, button: '승인', content: '승인 조회' },
  ];
  const [activeTab, setActiveTab] = useState(TabData[0].id);
  return (
    <div>
      {TabData.map((tab) => (
        <button
          key={tab.id}
          data-active={activeTab === tab.id ? 'true' : 'false'}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.button}
        </button>
      ))}
      <p> {TabData.find((a) => a.id === activeTab)?.content}</p>
    </div>
  );
};

export default TapMenu;
