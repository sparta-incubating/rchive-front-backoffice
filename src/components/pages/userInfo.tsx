'use client';

import refresh from '@/../public/assets/icons/refresh-button.svg';
import Image from 'next/image';
import { useState } from 'react';
interface UserInfoProps {
  username: string;
  trackName: string;
  period: string;
  trackRole: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  username,
  trackName,
  period,
  trackRole,
}) => {
  const profileImages = [
    '/assets/icons/MRT_1.svg',
    '/assets/icons/MRT_2.svg',
    '/assets/icons/MRT_3.svg',
    '/assets/icons/MRT_4.svg',
    '/assets/icons/MRT_5.svg',
    '/assets/icons/MRT_6.svg',
    '/assets/icons/MRT_7.svg',
    '/assets/icons/MRT_8.svg',
    '/assets/icons/MRT_9.svg',
  ];

  const [initImg, setInitImg] = useState(0);

  const handleRandomImg = () => {
    setInitImg((initImg) => (initImg + 1) % profileImages.length);
  };

  return (
    <div className="flex h-[306px] w-[1084px] flex-col items-center justify-center gap-[24px]">
      <div className="flex w-[1020px] flex-row items-center justify-between text-base">
        <p className="flex h-[24px]">회원정보</p>
        {trackRole === 'APM' && (
          <button className="h-[42px] w-[108px] rounded-[8px] border-2">
            권한수정요청
          </button>
        )}
      </div>

      {/* 회원 정보 */}
      <div className="flex h-[186px] w-[1020px] flex-col gap-[8px]">
        {/* 프로필*/}
        <div className="flex h-[160px] flex-row">
          <div className="w-[calc(100%-824px)]">
            <Image
              src={profileImages[initImg]}
              height={160}
              width={160}
              alt="랜덤프로필"
            />
            {/* <Image src={pmImg} height={161} width={160} alt="랜덤프로필" /> */}
          </div>
          <div className="w-[824px]">
            <div className="h-[60px] w-[332px]">
              <p className="text-[32px] font-bold">{username}</p>
            </div>
            {/*APM여부*/}
            <div className="flex w-[824px] flex-row gap-[16px]">
              {trackRole === 'PM' ? (
                <>
                  <div className="h-[100px] w-[404px]">
                    <p className="font-base h-[40px] w-[264px]">트랙</p>
                    <div className="h-[60px] w-[404px] rounded-[12px] border-2">
                      {trackName}
                    </div>
                  </div>
                  <div className="h-[100px] w-[404px]">
                    <p className="font-base h-[40px] w-[348px]">직책</p>
                    <div className="h-[60px] w-[404px] rounded-[12px] border-2">
                      {trackRole}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex w-[824px] flex-row gap-[16px] border">
                    <div className="h-[100px] w-[404px]">
                      <p className="font-base h-[40px] w-[264px]">트랙</p>
                      <div className="h-[60px] w-[264px] rounded-[12px] border-2">
                        {trackName}
                      </div>
                    </div>
                    <div className="h-[100px] w-[404px]">
                      <p className="font-base h-[40px] w-[264px]">기수</p>
                      <div className="h-[60px] w-[264px] rounded-[12px] border-2">
                        {period}
                      </div>
                    </div>
                    <div className="h-[100px] w-[404px]">
                      <p className="font-base h-[40px] w-[264px]">직책</p>
                      <div className="h-[60px] w-[264px] rounded-[12px] border-2">
                        {trackRole}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/*APM여부*/}
          </div>
        </div>
        {/* 프로필*/}

        {/* 리프레시버튼 */}
        <button onClick={handleRandomImg}>
          <div className="flex h-[18px] flex-row gap-[4px]">
            <Image src={refresh} width={16} height={16} alt="리프레시 버튼" />
            <p className="text-xs text-gray-400">랜덤 프로필 설정</p>
          </div>
        </button>
        {/* 리프레시버튼 */}
      </div>
      {/* 회원 정보 */}
    </div>
  );
};

export default UserInfo;
