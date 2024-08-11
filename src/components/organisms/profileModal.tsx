'use client';

import { profileSchema } from '@/validators/auth/profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import Input from '../atoms/input';
import InputContainer from '../atoms/InputContainer';
import Label from '../atoms/label';
import PasswordContainer from '../atoms/PasswordContainer';
import PhoneForm from '../molecules/form/PhoneForm';
import InputField from '../molecules/InputField';
import ProfileChangeForm from './profileChangeForm';
import SelectFormBox from './selectFormBox';

const trackOptions = [
  { value: 'track1', label: '트랙 1' },
  { value: 'track2', label: '트랙 2' },
  // 추가 옵션...
];

const ProfileModal = ({ type, onClose, onSubmit }) => {
  const schema = profileSchema[type];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(type, data); // 타입과 데이터 전달
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('업데이트 오류:', error);
    }
  };
  const renderContent = (type) => {
    switch (type) {
      case 'password':
        return (
          <ProfileChangeForm
            label="비밀번호 변경하기"
            onClick={handleSubmit(handleFormSubmit)}
            onClose={onClose}
          >
            <section>
              <InputContainer>
                <InputField>
                  <Label htmlFor="userName">현재 비밀번호</Label>
                  <Input
                    {...register('currentPassword')}
                    placeholder="현재 비밀번호 입력"
                    type="password"
                    className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                  />
                </InputField>
              </InputContainer>
            </section>
            <section>
              <PasswordContainer>
                <InputField variant="secondary">
                  <Label htmlFor="password">새 비밀번호</Label>
                  <Input
                    {...register('newPassword')}
                    type="password"
                    placeholder="6자 이상, 숫자와 영문자 조합"
                    className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                  />
                </InputField>
                <div className="border" />
                <Input
                  type="password"
                  placeholder="비밀번호 재입력"
                  className="my-[28px] h-[20px] w-[320px] bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                />
              </PasswordContainer>
            </section>
          </ProfileChangeForm>
        );
      case 'phone':
        return (
          <ProfileChangeForm
            label="휴대폰 변경"
            onClick={handleSubmit(handleFormSubmit)}
            onClose={onClose}
          >
            <p className="text-center">
              휴대폰 번호 변경을 위해 인증이 필요해요
            </p>
            <PhoneForm register={register} />
          </ProfileChangeForm>
        );
      case 'role':
        return (
          <ProfileChangeForm
            label="권한 수정 요청 페이지 입니다."
            onClick={handleSubmit(handleFormSubmit)}
            onClose={onClose}
          >
            <Controller
              name="trackName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectFormBox
                  className="w-[360px]"
                  options={trackOptions}
                  label="트랙"
                  onSelect={onChange}
                  value={value || ''} // 기본 값 설정
                />
              )}
            />{' '}
            <InputContainer>
              <InputField>
                <Label htmlFor="username">기수</Label>
                <Input
                  {...register('username')}
                  placeholder="*1기라면 '1'만 작성해주세요"
                  className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                />
              </InputField>
            </InputContainer>
          </ProfileChangeForm>
        );
      default:
        return null;
    }
  };
  return (
    <div className="modal">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {renderContent(type)}
      </form>
    </div>
  );
};

export default ProfileModal;
