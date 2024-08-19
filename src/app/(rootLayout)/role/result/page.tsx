import RoleSelectForm from '@/components/organisms/roleSelectForm';
import RoleContainerPage from '@/components/pages/roleContainerPage';
import RoleWait from '@/components/pages/roleResult/roleWait';
import { RoleResultEnum } from '@/types/role.types';
import { createServerAPI } from '@/utils/serverAPI';
import { isTeamSpartaEmail } from '@/utils/utils';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

const RoleResultPage = async () => {
  const email = getCookie('loginId', { cookies });
  const trackRole = isTeamSpartaEmail(String(email)) ? 'PM' : 'APM';

  // 권한 신청 결과 조회 endpoint
  const getRoleApplyResult = async () => {
    const serverAPI = await createServerAPI();

    try {
      const response = await serverAPI.get('/apis/v1/role/result');
      return response.data.data;
    } catch (error) {
      throw new Error('권한 신청 결과 조회에 실패했습니다.');
    }
  };

  const roleApplyResult = await getRoleApplyResult();

  return (
    <RoleContainerPage>
      <section className="m-auto flex w-[520px] flex-col items-center gap-5 rounded-[12px] bg-white pb-7 pt-5">
        {roleApplyResult === RoleResultEnum.WAIT && (
          <>
            <span className="text-center text-xl font-medium text-gray-900">
              현재 승인대기 상태입니다.
            </span>
            <RoleWait />
          </>
        )}

        {roleApplyResult === RoleResultEnum.REJECT && (
          <RoleSelectForm trackRole={trackRole}>
            <span className="text-center text-xl font-medium text-gray-900">
              승인이 거절되었습니다.
            </span>
            <span className="text-sm text-gray-900">
              해당하는 트랙과 기수를 다시 선택해주세요.
            </span>
          </RoleSelectForm>
        )}

        {roleApplyResult === RoleResultEnum.APPROVE && (
          <>
            <span className="text-center text-xl font-medium text-gray-900">
              가입 승인이 완료되었습니다.
            </span>
            <RoleWait />
          </>
        )}
      </section>
    </RoleContainerPage>
  );
};

export default RoleResultPage;
