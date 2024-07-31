import PermissionBoard from '@/components/atoms/permissionBoard';
import AccountInfo from '@/components/pages/accountInfo';
import BackofficePage from '@/components/pages/backofficePage';
import UserInfo from '@/components/pages/userInfo';

const page = () => {
  return (
    <BackofficePage>
      <PermissionBoard variant="userInfo">
        <UserInfo />
      </PermissionBoard>
      <PermissionBoard variant="accountInfo">
        <AccountInfo />
      </PermissionBoard>
    </BackofficePage>
  );
};

export default page;
