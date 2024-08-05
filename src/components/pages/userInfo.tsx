'use client';

import refresh from '@/../public/assets/icons/refresh-button.svg';
import Image from 'next/image';

const UserInfo = ({ username, trackName, period, trackRole }) => {
  return (
    <div className="flex h-[306px] w-[1084px] flex-col items-center justify-center gap-[24px]">
      <p className="h-[24px] w-[1020px] text-base">회원정보</p>

      {/* 회원 정보 */}
      <div className="flex h-[186px] w-[1020px] flex-col gap-[8px]">
        {/* 프로필*/}
        <div className="flex h-[160px] flex-row">
          <div className="w-[calc(100%-824px)] border">이미지</div>
          <div className="w-[824px]">
            <div className="h-[60px] w-[332px]">
              <p className="text-[32px] font-bold">{username}</p>
            </div>

            <div className="flex w-[824px] flex-row gap-[16px]">
              <div className="h-[100px] w-[404px]">
                <p className="font-base h-[40px] w-[348px]">트랙</p>
                <div className="h-[60px] w-[404px] rounded-[12px] border-2">
                  {trackName}
                </div>
              </div>
              <div className="h-[100px] w-[404px]">
                <p className="font-base h-[40px] w-[348px]">기수</p>
                <div className="h-[60px] w-[404px] rounded-[12px] border-2">
                  {period}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 프로필*/}

        {/* 리프레시버튼 */}
        <div className="flex h-[18px] flex-row gap-[4px]">
          <Image src={refresh} width={16} height={16} alt="리프레시 버튼" />
          <p className="text-xs text-gray-400">랜덤 프로필 설정</p>
        </div>
        {/* 리프레시버튼 */}
      </div>
      {/* 회원 정보 */}
    </div>
  );
};

export default UserInfo;
