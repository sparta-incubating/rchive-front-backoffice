import { useProfileUpdate } from '@/api/profile/useMutation';
import IconButton from '@/components/atoms/iconButton';
import PhoneForm from '@/components/molecules/form/PhoneForm';
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
      <div className="flex w-[520px] flex-col items-center rounded-[14px] bg-white">
        {/* 나가기버튼 */}
        <div className="flex h-[72px] w-full justify-end p-[28px]">
          <IconButton onClick={onClose}>
            <div className="relative h-5 w-5">
              <div className="relative flex h-5 w-5 items-center justify-center bg-[url('/assets/icons/close.svg')] bg-center bg-no-repeat"></div>
            </div>
          </IconButton>
        </div>
        {/* 제목 */}
        <div className="h-[50px]">
          <p className="text-center text-xl">휴대폰 변경</p>
        </div>
        <div className="h-[250px] px-[24px]">
          <div className="flex flex-col gap-[10px]">
            <PhoneForm register={register} />
            {errors.phone && <span>{errors.phone.message}</span>}
          </div>
        </div>
        <div className="h-[106px]">
          <button type="submit" className="w-[360px] border">
            완료
          </button>
        </div>
      </div>
    </form>
  );
};

export default PhoneChangeModal;
