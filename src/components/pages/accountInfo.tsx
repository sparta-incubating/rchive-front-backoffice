'use client ';
import { AccountInfoProps } from '@/types/profile.types';
import ProfileContainer from '../molecules/profileContainer';

const AccountInfo = ({
  email,
  phone,
  handleChangePassword,
  handleChangePhoneNumber,
}: AccountInfoProps) => {
  return (
    <main className="flex flex-col items-center justify-center gap-[24px]">
      {/* 계정정보 Title*/}
      <section className="flex h-[40px] w-[1012px] items-center">
        <p className="h-[24px] w-[1020px] text-base font-medium leading-6">
          계정정보
        </p>
      </section>

      {/* 계정정보 */}
      <section className="flex flex-row gap-[16px] text-base">
        {/*정보1 */}
        <ProfileContainer label="이메일" data={email} showButton={false} />
        {/*정보2 */}
        <ProfileContainer
          className="text-gray-300"
          label="비밀번호"
          data="주기적으로 변경해주세요"
          onClick={handleChangePassword}
        />
        {/*정보3 */}
        <ProfileContainer
          label="전화번호"
          data={phone}
          onClick={handleChangePhoneNumber}
        />
      </section>
    </main>
  );
};

export default AccountInfo;
