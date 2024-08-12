import { useProfileUpdate } from '@/api/profile/useMutation';
import PhoneForm from '@/components/molecules/form/PhoneForm';
import ProfileChangeForm from '@/components/organisms/profileChangeForm';
import { profilePhoneSchema } from '@/validators/auth/profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ChangeSuccessModal from './changeSuccessModal';
import { PasswordChangeModalProps } from './passwordChangeModal';

const PhoneChangeModal = ({ onClose }: PasswordChangeModalProps) => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
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
    },
  });

  const { updatePhoneNumberMutate } = useProfileUpdate();

  const onSubmit = async (data: z.infer<typeof profilePhoneSchema>) => {
    try {
      await updatePhoneNumberMutate.mutateAsync(data);
      setIsSuccessful(true);
    } catch (error) {
      console.error('Error updating password:', error);
      alert('휴대폰번호 변경에 실패했습니다. 다시 시도해 주세요.');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!isSuccessful ? (
        <ProfileChangeForm
          label="휴대폰 번호 변경"
          onClose={onClose}
          isValid={isValid}
        >
          <p className="text-center text-gray-300">
            휴대폰 변경을 위해 인증이 필요해요
          </p>
          <section className="flex flex-col gap-[10px]">
            <PhoneForm register={register} />
            {errors.phone && (
              <span className="text-sm text-primary-400">
                {errors.phone.message}
              </span>
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
