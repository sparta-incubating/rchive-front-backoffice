'use client ';
import { useProfileUpdate } from '@/api/profile/useMutation';
import ProfileContainer from '../molecules/profileContainer';

const AccountInfo = ({ email, phone }) => {
  const { updatePasswordMutate, updatePhoneNumberMutate } = useProfileUpdate();

  const handleChangePassword = () => {
    const rePw = 'manager1';
    const newPw = 'manager1@';
    const password = { rePw, newPw };
    updatePasswordMutate.mutate(password);
  };
  const handleChangePhoneNumber = () => {
    const newPhoneNumber = '01012345678';
    updatePhoneNumberMutate.mutate(newPhoneNumber);
  };
  return (
    <main className="flex h-[236px] w-[1084px] flex-col items-center justify-center gap-[24px]">
      {/* 계정정보 Title*/}
      <section className="flex h-[40px] w-[1012px] items-center">
        <p className="h-[24px] w-[1020px] text-base">계정정보</p>
      </section>

      {/* 계정정보 */}
      <section className="w-[1012px ] h-[108px]">
        <article className="flex h-[24px] w-[1020px] flex-row gap-[16px] text-base">
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
        </article>
      </section>
    </main>
  );
};

export default AccountInfo;
