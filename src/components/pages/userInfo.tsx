'use client';

import Image from 'next/image';
import UserInfoContainer from '../molecules/userInfoContainer';

interface UserInfoProps {
  username: string;
  trackName: string;
  period: string;
  trackRole: string;
  profileImg: string;
  handleChangeImage: () => void;
  handleChangeRole: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({
  username,
  trackName,
  period,
  trackRole,
  profileImg,
  handleChangeImage,
  handleChangeRole,
}) => {
  return (
    <main className="flex h-[306px] w-[1084px] flex-col items-center justify-center gap-[24px]">
      <section className="flex w-[1020px] flex-row items-center justify-between text-base">
        <p className="flex h-[24px]">회원정보</p>
        {trackRole === 'PM' && (
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
          <figure className="group relative w-[calc(100%-860px)]">
            <Image
              src={`/assets/icons/${profileImg}.svg`}
              height={160}
              width={160}
              alt="랜덤프로필"
              className="object-cover"
            />
            <div className="absolute inset-0 w-[160px] rounded-[8px] bg-gray-900 opacity-0 group-hover:opacity-30" />
            <div className="absolute inset-10 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={handleChangeImage}
                className="relative flex h-[36px] w-[80px] items-center justify-center rounded-[26px] border border-blue-100 bg-white px-5 py-3 hover:bg-blue-55"
              >
                <p className="text-xs font-bold"> 변경</p>
              </button>
            </div>
          </figure>
          <figcaption className="w-[824px]">
            <section className="ml-[36px] h-[60px] w-[332px]">
              <p className="text-[32px] font-bold">{username}</p>
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
      </section>
      {/* 회원 정보 */}
    </main>
  );
};

export default UserInfo;
