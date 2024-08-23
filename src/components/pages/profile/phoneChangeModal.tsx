import { useProfileUpdate } from '@/api/profile/useMutation';
import AuthTimer from '@/components/atoms/authTimer';
import Label from '@/components/atoms/label';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import PhoneChangeField from '@/components/molecules/form/PhonChangeField';
import InputField from '@/components/molecules/InputField';
import ProfileChangeForm from '@/components/organisms/profileChangeForm';
import { PhoneChangeModalProps } from '@/types/profile.types';
import { profilePhoneSchema } from '@/validators/auth/profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ChangeSuccessModal from './changeSuccessModal';

const PhoneChangeModal = ({ onClose, username }: PhoneChangeModalProps) => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [requestAuthNumber, setRequestAuthNumber] = useState<boolean>(false);
  const [expire, setExpire] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<z.infer<typeof profilePhoneSchema>>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(profilePhoneSchema),
    defaultValues: {
      phone: '',
      authCode: '',
    },
  });

  const { updatePhoneNumberMutate, checkPhoneAuthMutate } = useProfileUpdate();

  const onSubmit = async (data: z.infer<typeof profilePhoneSchema>) => {
    const userInfo = {
      username,
      phone: data?.phone,
      authCode: data.authCode,
    };
    try {
      console.log(userInfo, '입력값');
      await checkPhoneAuthMutate.mutateAsync(userInfo);
      try {
        console.log(data?.phone, '입력값');
        await updatePhoneNumberMutate.mutateAsync(data?.phone);
        setIsSuccessful(true);
      } catch (error) {
        alert('휴대폰번호 변경에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('Error updating phone:', error);
      alert('인증번호 확인에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  console.log(requestAuthNumber, '인증요청');
  // console.log('-------------------');
  // console.log(expire, '타이머 만료');
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!isSuccessful ? (
        <ProfileChangeForm
          labels={{
            main: '휴대폰 번호 변경',
            sub: '휴대폰 변경을 위해 인증이 필요해요',
          }}
          onClose={onClose}
          isValid={isValid}
        >
          <section className="flex flex-col gap-[10px]">
            {/** */}
            <PasswordContainer variant="primary">
              <InputField>
                <Label htmlFor="phone">휴대폰 번호</Label>
                <PhoneChangeField
                  username={username}
                  register={register}
                  label="인증 요청"
                />
              </InputField>
            </PasswordContainer>
            {/** */}
            {errors.phone && (
              <span className="text-sm text-primary-400">
                {errors.phone.message}
              </span>
            )}
            {requestAuthNumber && <AuthTimer setExpire={setExpire} />}
          </section>
        </ProfileChangeForm>
      ) : (
        <ChangeSuccessModal label="휴대폰 변경" onClose={onClose} />
      )}
    </form>
  );
};

export default PhoneChangeModal;
