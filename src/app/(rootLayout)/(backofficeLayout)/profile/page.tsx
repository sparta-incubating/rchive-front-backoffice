'use client';

import { useUserInfoDataQuery } from '@/api/profile/useQuery';
import PermissionBoard from '@/components/atoms/permissionBoard';
import AccountInfo from '@/components/pages/accountInfo';
import BackofficePage from '@/components/pages/backofficePage';
import PasswordChangeModal from '@/components/pages/profile/passwordChangeModal';
import PhoneChangeModal from '@/components/pages/profile/phoneChangeModal';
import RandomProfileModal from '@/components/pages/profile/randomProfileModal';
import RoleChangeModal from '@/components/pages/profile/roleChangeModal';
import UserInfo from '@/components/pages/userInfo';
import { useState } from 'react';

const Profile = () => {
  const { userData, isError, isPending } = useUserInfoDataQuery();
  const [modalType, setModalType] = useState<string | null>(null);
  if (isError) {
    return <div>에러입니다</div>;
  }

  if (isPending) {
    return <div>로딩중...</div>;
  }

  const { email, username, profileImg, trackName, period, trackRole, phone } =
    userData.data;
  const openModal = (type: string) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <BackofficePage>
      <PermissionBoard variant="userInfo">
        <UserInfo
          profileImg={profileImg}
          username={username}
          trackName={trackName}
          period={period}
          trackRole={trackRole}
          handleChangeRole={() => openModal('role')}
          handleChangeImage={() => openModal('image')}
        />
      </PermissionBoard>
      <PermissionBoard variant="accountInfo">
        <AccountInfo
          email={email}
          phone={phone}
          handleChangePassword={() => openModal('password')}
          handleChangePhoneNumber={() => openModal('phone')}
        />
      </PermissionBoard>

      {modalType === 'password' && <PasswordChangeModal onClose={closeModal} />}
      {modalType === 'phone' && <PhoneChangeModal onClose={closeModal} />}
      {modalType === 'role' && (
        <RoleChangeModal onClose={closeModal} trackRole={trackRole} />
      )}
      {modalType === 'image' && (
        <RandomProfileModal onClose={closeModal} profileImg={profileImg} />
      )}
    </BackofficePage>
  );
};

export default Profile;
