'use client';

import { UserInfoProps } from '@/types/profile.types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import UserInfoContainer from '../molecules/userInfoContainer';

const UserInfo: React.FC<UserInfoProps> = ({
  username,
  trackName,
  period,
  trackRole,
  profileImg,
  handleChangeImage,
  handleChangeRole,
}) => {
  const [init, setInit] = useState<string>(profileImg);

  useEffect(() => {
    if (!profileImg.includes('MRT')) {
      setInit('MRT_1');
    }
  }, [profileImg, init]);

  return (
    <main className="flex flex-col items-center justify-center gap-[24px]">
      <section className="flex h-[24px] w-[1012px] flex-row items-center justify-between text-base">
        <p className="flex h-[24px] w-[60px] text-base font-medium leading-6 text-gray-900">
          회원정보
        </p>
        {trackRole === 'APM' && (
          <button
            className="box-border h-[44px] w-[111px] rounded-[8px] border px-[20px] py-[12px]"
            onClick={handleChangeRole}
          >
            <p className="text-xs font-semibold leading-[18px] text-gray-900">
              권한 수정 요청
            </p>
          </button>
        )}
      </section>

      {/* 회원 정보 */}
      <section className="flex h-[186px] w-[1020px] flex-col gap-[8px]">
        {/* 프로필*/}
        <article className="flex h-[160px] flex-row">
          <figure className="group relative w-[calc(100%-860px)]">
            <Image
              src={`/assets/icons/${init}.svg`}
              height={160}
              width={160}
              alt="랜덤프로필"
              className="object-cover"
            />
            <div className="absolute inset-0 w-[160px] rounded-[8px] bg-gray-900 opacity-0 group-hover:opacity-30" />
            <div className="absolute inset-10 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={handleChangeImage}
                className="relative flex h-[38px] w-[82px] items-center justify-center rounded-[26px] border border-blue-100 bg-white px-5 py-3 text-center hover:bg-blue-55"
              >
                <p className="text-center text-xs font-semibold">변경</p>
              </button>
            </div>
          </figure>
          <figcaption className="w-[824px]">
            <section className="ml-[36px] h-[60px] w-[332px]">
              <p className="text-[32px] font-bold leading-[43.2px]">
                {username}
              </p>
            </section>

            <section className="ml-[36px] flex w-[824px] flex-row gap-[16px]">
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
                    className="w-[263px]"
                  />
                  <UserInfoContainer
                    label="기수"
                    data={period}
                    className="w-[263px]"
                  />
                  <UserInfoContainer
                    label="직책"
                    data={trackRole}
                    className="w-[263px]"
                  />
                </>
              )}
            </section>
            {/*APM여부*/}
          </figcaption>
        </article>
        {/* 프로필*/}
      </section>
      {/* 회원 정보 */}
    </main>
  );
};

export default UserInfo;
