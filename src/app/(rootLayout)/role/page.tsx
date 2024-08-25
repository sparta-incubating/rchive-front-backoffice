import RoleSelectForm from '@/components/organisms/roleSelectForm';
import RoleContainerPage from '@/components/pages/roleContainerPage';
import { isTeamSpartaEmail } from '@/utils/utils';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

const RolePage = () => {
  const email = getCookie('loginId', { cookies });
  const trackRole = isTeamSpartaEmail(String(email)) ? 'PM' : 'APM';

  return (
    <RoleContainerPage>
      <RoleSelectForm trackRole={trackRole}>
        <span className="text-center text-xl font-medium text-gray-900">
          {trackRole === 'PM' ? '트랙 선택' : '트랙 및 기수 선택'}
        </span>
      </RoleSelectForm>
    </RoleContainerPage>
  );
};

export default RolePage;
