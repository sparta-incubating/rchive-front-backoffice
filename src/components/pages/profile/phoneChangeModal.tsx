import { useProfileUpdate } from '@/api/profile/useMutation';
import PhoneForm from '@/components/molecules/form/PhoneForm';
import ProfileChangeForm from '@/components/organisms/profileChangeForm';
import { profilePhoneSchema } from '@/validators/auth/profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PasswordChangeModalProps } from './passwordChangeModal';

const PhoneChangeModal = ({ onClose }: PasswordChangeModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof profilePhoneSchema>>({
    resolver: zodResolver(profilePhoneSchema),
    defaultValues: {
      phone: '',
    },
  });

  const { updatePhoneNumberMutate } = useProfileUpdate();

  const onSubmit = async (data: z.infer<typeof profilePhoneSchema>) => {
    console.log('Submitted data:', data);
    try {
      await updatePhoneNumberMutate.mutateAsync(data);
      alert('휴대폰번호가 성공적으로 변경되었습니다.');
      onClose();
    } catch (error) {
      console.error('Error updating password:', error);
      alert('휴대폰번호 변경에 실패했습니다. 다시 시도해 주세요.');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProfileChangeForm label="전화번호 변경" onClose={onClose}>
        <div className="flex flex-col gap-[10px]">
          <PhoneForm register={register} />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>
      </ProfileChangeForm>
    </form>
  );
};

export default PhoneChangeModal;
