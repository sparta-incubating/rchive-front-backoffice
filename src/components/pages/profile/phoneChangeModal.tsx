import { useProfileUpdate } from '@/api/profile/useMutation';
import AuthTimer from '@/components/atoms/authTimer';
import FormSpan from '@/components/atoms/formSpan';
import Label from '@/components/atoms/label';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import PhoneChangeField from '@/components/molecules/form/PhonChangeField';
import InputField from '@/components/molecules/InputField';
import ProfileChangeForm from '@/components/organisms/profileChangeForm';
import { PhoneChangeModalProps } from '@/types/profile.types';
import { authCodeType } from '@/types/signup.types';
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
  // const [authErrorMsg, setAuthErrorMsg] = useState<boolean>(false);
  const [isErrorMsg, setIsErrorMsg] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

  const authCheck = async (userInfo: authCodeType) => {
    try {
      await checkPhoneAuthMutate.mutateAsync(userInfo);
      setDisabled(true);
      setIsErrorMsg('인증이 완료됐습니다.');
    } catch (error) {
      setIsErrorMsg('인증 번호가 일치하지 않습니다.');
    }
  };

  const onSubmit = async (data: z.infer<typeof profilePhoneSchema>) => {
    const userInfo = {
      username,
      phone: data?.phone,
      authCode: data.authCode,
    };
    try {
      await authCheck(userInfo);
      try {
        await updatePhoneNumberMutate.mutateAsync(data?.phone);
        setIsSuccessful(true);
      } catch (error) {
        alert('휴대폰번호 변경에 실패했습니다. 다시 시도해 주세요.');
        setDisabled(false);
      }
    } catch (error) {
      console.error('Error updating phone:', error);
      setDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!isSuccessful ? (
        <ProfileChangeForm
          labels={{
            main: '휴대폰 번호 변경',
            sub: '휴대폰 변경을 위해 인증이 필요해요',
          }}
          onClose={onClose}
          isValid={disabled}
        >
          <section className="flex flex-col gap-2.5">
            {/** */}
            <PasswordContainer variant="primary">
              <InputField>
                <Label htmlFor="phone">휴대폰 번호</Label>
                <PhoneChangeField
                  register={register}
                  username={username}
                  authCheck={authCheck}
                  setIsErrorMsg={setIsErrorMsg}
                  setRequestAuthNumber={setRequestAuthNumber}
                  expire={expire}
                />
              </InputField>
            </PasswordContainer>
            {errors.phone?.message && (
              <FormSpan variant="error">휴대폰 인증번호는 필수입니다.</FormSpan>
            )}
            {!errors.phone?.message && (
              <>
                {isErrorMsg && (
                  <span
                    className={
                      isErrorMsg.includes('완료됐습니다')
                        ? 'text-sm text-success-green'
                        : 'text-sm text-primary-400'
                    }
                  >
                    {isErrorMsg}
                  </span>
                )}
                {requestAuthNumber && !isErrorMsg && (
                  <AuthTimer setExpire={setExpire} />
                )}
              </>
            )}
          </section>
        </ProfileChangeForm>
      ) : (
        <ChangeSuccessModal label="휴대폰 변경" onClose={onClose} />
      )}
    </form>
  );
};

export default PhoneChangeModal;
