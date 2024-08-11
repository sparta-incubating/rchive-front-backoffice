'use client';

import { useProfileUpdate } from '@/api/profile/useMutation';
import { useUserInfoDataQuery } from '@/api/profile/useQuery';
import PermissionBoard from '@/components/atoms/permissionBoard';
import ProfileModal from '@/components/organisms/profileModal';
import AccountInfo from '@/components/pages/accountInfo';
import BackofficePage from '@/components/pages/backofficePage';
import UserInfo from '@/components/pages/userInfo';
import { useState } from 'react';

export interface USERPROFILE {
  username: string;
  trackName: string;
  period: string;
  trackRole: string;
  email: string;
  phone: string;
}

const Profile = () => {
  const { updatePasswordMutate, updatePhoneNumberMutate, updateRoleMutate } =
    useProfileUpdate();
  const { userData, isError, isPending } = useUserInfoDataQuery();
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState({});

  if (isError) {
    return <div>에러입니다</div>;
  }

  if (isPending) {
    return <div>에러입니다</div>;
  }

  const { username, trackName, period, trackRole, email, phone } =
    userData.data;
  const openModal = (type) => {
    setModalType(type);
    setModalData({});
  };

  const closeModal = () => {
    setModalType(null);
    setModalData({});
  };
  const handleSubmit = async (type: string, data: any) => {
    try {
      switch (type) {
        case 'password':
          await updatePasswordMutate.mutate(data); // 비밀번호 업데이트
          break;
        case 'phone':
          await updatePhoneNumberMutate.mutate(data); // 전화번호 업데이트
          break;
        case 'role':
          await updateRoleMutate.mutate(data); // 권한 업데이트
          break;
        default:
          throw new Error('Unknown modal type');
      }
    } catch (error) {
      console.error('업데이트 오류:', error);
    }
  };
  return (
    <BackofficePage>
      <PermissionBoard variant="userInfo">
        <UserInfo
          username={username}
          trackName={trackName}
          period={period}
          trackRole={trackRole}
          handleChangeRole={() => openModal('role')}
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

      {modalType && (
        <ProfileModal
          type={modalType}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </BackofficePage>
  );
};

export default Profile;
