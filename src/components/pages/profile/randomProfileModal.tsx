'use client';

import refresh from '@/../public/assets/icons/refresh-button.svg';
import { useProfileUpdate } from '@/api/profile/useMutation';
import ProfileChangeForm from '@/components/organisms/profileChangeForm';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface RandomProfileModalProps {
  onClose: () => void;
  profileImg: string;
}

const RandomProfileModal = ({
  onClose,
  profileImg,
}: RandomProfileModalProps) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [initImg, setInitImg] = useState<string>(profileImg);
  const [selectImg, setSelectImg] = useState<number>(0);

  useEffect(() => {
    if (profileImg === 'img') {
      setInitImg('MRT_1');
    }
  }, [profileImg]);

  const { updateProfileInfoMutate } = useProfileUpdate();

  const randomProfile = [
    'MRT_1',
    'MRT_2',
    'MRT_3',
    'MRT_4',
    'MRT_5',
    'MRT_6',
    'MRT_7',
    'MRT_8',
    'MRT_9',
  ];

  const imgName = 'MRT_' + (selectImg + 1);

  const handleRandomImg = () => {
    setSelectImg((selectImg) => (selectImg + 1) % randomProfile.length);
    setInitImg(imgName);
    setIsValid(true);
  };

  const profileInfo = {
    profileImg: initImg,
    nickname: '',
  };

  const onSubmit = async () => {
    updateProfileInfoMutate.mutate(profileInfo);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <ProfileChangeForm
          label="랜덤프로필 변경"
          onClose={onClose}
          isValid={isValid}
        >
          <span>원하시는 프로필로 변경해 보세요.</span>
          <figure>
            <Image
              src={`/assets/icons/${initImg}.svg`}
              height={160}
              width={160}
              alt="랜덤프로필"
            />
          </figure>
          {/* 리프레시버튼 */}
          <button onClick={handleRandomImg} type="button">
            <div className="flex h-[18px] flex-row gap-[4px]">
              <Image src={refresh} width={16} height={16} alt="리프레시 버튼" />
              <p className="text-xs text-gray-400">랜덤 프로필 설정</p>
            </div>
          </button>
          {/* 리프레시버튼 */}
        </ProfileChangeForm>
      </form>
    </>
  );
};

export default RandomProfileModal;