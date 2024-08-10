'use client';

import refresh from '@/../public/assets/icons/refresh-button.svg';
import { useProfileUpdate } from '@/api/profile/useMutation';
import Image from 'next/image';
import { useState } from 'react';
import UserInfoContainer from '../molecules/userInfoContainer';
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
  const { updateRoleMutate } = useProfileUpdate();
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
  const handleChangeRole = () => {
    const trackName = 'WEB';
    const period = 0;
    const trackRole = 'PM';
    const roleInfo = { trackName, period, trackRole };
    updateRoleMutate.mutate(roleInfo);
  };
  return (
    <main className="flex h-[306px] w-[1084px] flex-col items-center justify-center gap-[24px]">
      <section className="flex w-[1020px] flex-row items-center justify-between text-base">
        <p className="flex h-[24px]">회원정보</p>
        {trackRole === 'APM' && (
          <button
            className="h-[42px] w-[108px] rounded-[8px] border-2"
            onClick={handleChangeRole}
          >
            권한수정요청
          </button>
        )}
      </section>

      {/* 회원 정보 */}
      <section className="flex h-[186px] w-[1020px] flex-col gap-[8px]">
        {/* 프로필*/}
        <article className="flex h-[160px] flex-row">
          <figure className="w-[calc(100%-824px)]">
            <Image
              src={profileImages[initImg]}
              height={160}
              width={160}
              alt="랜덤프로필"
            />
          </figure>
          <figcaption className="w-[824px]">
            <section className="h-[60px] w-[332px]">
              <p className="text-[32px] font-bold">{username}</p>
            </section>

            <section className="flex w-[824px] flex-row gap-[16px]">
              {trackRole === 'PM' ? (
                <>
                  <UserInfoContainer label="트랙" data={trackName} />

                  <UserInfoContainer label="직책" data={trackRole} />
                </>
              ) : (
                <>
                  <UserInfoContainer
                    label="트랙"
                    data={trackName}
                    className="w-[264px]"
                  />
                  <UserInfoContainer
                    label="기수"
                    data={period}
                    className="w-[264px]"
                  />
                  <UserInfoContainer
                    label="직책"
                    data={trackRole}
                    className="w-[264px]"
                  />
                </>
              )}
            </section>
            {/*APM여부*/}
          </figcaption>
        </article>
        {/* 프로필*/}

        {/* 리프레시버튼 */}
        <button onClick={handleRandomImg}>
          <div className="flex h-[18px] flex-row gap-[4px]">
            <Image src={refresh} width={16} height={16} alt="리프레시 버튼" />
            <p className="text-xs text-gray-400">랜덤 프로필 설정</p>
          </div>
        </button>
        {/* 리프레시버튼 */}
      </section>
      {/* 회원 정보 */}
    </main>
  );
};

export default UserInfo;
