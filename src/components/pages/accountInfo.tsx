'use client ';
import { useProfileUpdate } from '@/api/profile/useMutation';
import TitleContainer from '../molecules/post/titleContainer';
const AccountInfo = ({ email, phone }) => {
  const { updatePasswordMutate, updatePhoneNumberMutate } = useProfileUpdate();

  const handleChangePassword = () => {
    const rePw = 'manager1';
    const newPw = 'manager1@';
    const password = { rePw, newPw };
    const res = updatePasswordMutate.mutate(password);
    console.log(res, '휴대폰 변경');
  };
  const handleChangePhoneNumber = () => {
    const newPhoneNumber = '01077778888';
    const res = updatePhoneNumberMutate.mutate(newPhoneNumber);
    console.log(res, '휴대폰 변경2');
  };
  return (
    <div className="flex h-[236px] w-[1084px] flex-col items-center justify-center gap-[24px]">
      <div className="flex h-[40px] w-[1012px] items-center">
        <p className="h-[24px] w-[1020px] text-base">계정정보</p>
      </div>
      <div className="h-[108px] w-[1012px]">
        <div className="flex h-[24px] w-[1020px] flex-row gap-[16px] text-base">
          {/*정보1 */}
          <div className="h-[108px] w-[326.67px] border">
            <TitleContainer title="이메일">
              <div className="h-[60px] w-[332px] rounded-[12px] border-2">
                {email}
              </div>
            </TitleContainer>
          </div>

          {/*정보2 */}
          <div className="h-[108px] w-[326.67px]">
            <TitleContainer title="비밀번호">
              <div className="h-[60px] w-[332px] rounded-[12px] border-2">
                <p className="text-gray-300">주기적으로 변경해주세요</p>
                <button onClick={handleChangePassword}>변경하기</button>
              </div>
            </TitleContainer>
          </div>

          {/*정보3 */}
          <div className="h-[108px] w-[326.67px]">
            <TitleContainer title="휴대폰번호">
              <div className="h-[60px] w-[332px] rounded-[12px] border-2">
                {phone}
              </div>
              <button onClick={handleChangePhoneNumber}>변경하기</button>{' '}
            </TitleContainer>
          </div>

          {/*정보1 */}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
