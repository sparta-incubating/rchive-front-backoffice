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
      <RoleSelectForm trackRole={trackRole} />
    </RoleContainerPage>
  );
};

export default RolePage;
