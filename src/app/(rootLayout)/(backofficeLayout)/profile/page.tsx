'use client';

import { useUserInfoDataQuery } from '@/api/profile/useQuery';
import PermissionBoard from '@/components/atoms/permissionBoard';
import AccountInfo from '@/components/pages/accountInfo';
import BackofficePage from '@/components/pages/backofficePage';
import UserInfo from '@/components/pages/userInfo';

const Profile = () => {
  const { userData, isError, isPending } = useUserInfoDataQuery();
  const { username, trackName, period, trackRole, email, phone } =
    userData.data;
  if (isError) {
    return <div>에러입니다</div>;
  }

  if (isPending) {
    return <div>에러입니다</div>;
  }

  return (
    <BackofficePage>
      <PermissionBoard variant="userInfo">
        <UserInfo
          username={username}
          trackName={trackName}
          period={period}
          trackRole={trackRole}
        />
      </PermissionBoard>
      <PermissionBoard variant="accountInfo">
        <AccountInfo email={email} phone={phone} />
      </PermissionBoard>
    </BackofficePage>
  );
};

export default Profile;
