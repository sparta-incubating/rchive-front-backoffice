import { useProfileUpdate } from '@/api/profile/useMutation';
import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import Label from '@/components/atoms/label';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import InputField from '@/components/molecules/InputField';
import ProfileChangeForm from '@/components/organisms/profileChangeForm';
import { profilePasswordSchema } from '@/validators/auth/profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export interface PasswordChangeModalProps {
  onClose: () => void;
}

const PasswordChangeModal = ({ onClose }: PasswordChangeModalProps) => {
  const [pwErrorMsg, setpwErrorMsg] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof profilePasswordSchema>>({
    resolver: zodResolver(profilePasswordSchema),
    defaultValues: {
      originPassword: '',
      newPassword: '',
      passwordConfirm: '',
    },
  });

  const { updatePasswordMutate } = useProfileUpdate();

  const onSubmit = async (data: z.infer<typeof profilePasswordSchema>) => {
    console.log('Submitted data:', data);
    try {
      await updatePasswordMutate.mutateAsync(data);
      alert('비밀번호가 성공적으로 변경되었습니다.');
      onClose();
    } catch (error) {
      console.error('Error updating password:', error);
      setpwErrorMsg('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProfileChangeForm label="비밀번호 변경" onClose={onClose}>
        <section>
          <InputContainer>
            <InputField>
              <Label htmlFor="originPassword">현재 비밀번호</Label>
              <Input
                {...register('originPassword')}
                placeholder="현재 비밀번호 입력"
                type="password"
                className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
              />
            </InputField>
          </InputContainer>
          <span className="text-sm text-primary-400">
            {errors.originPassword?.message || pwErrorMsg}
          </span>
        </section>
        <section>
          <PasswordContainer>
            <InputField variant="secondary">
              <Label htmlFor="newPassword">새 비밀번호</Label>
              <Input
                {...register('newPassword')}
                type="password"
                placeholder="6자 이상, 숫자와 영문자 조합"
                className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
              />
            </InputField>
            <div className="border" />
            <Input
              {...register('passwordConfirm')}
              type="password"
              placeholder="비밀번호 재입력"
              className="my-[28px] h-[20px] w-[320px] bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
            />
          </PasswordContainer>
          {errors.passwordConfirm && (
            <span className="text-sm text-primary-400">
              {errors.passwordConfirm.message}
            </span>
          )}
        </section>
      </ProfileChangeForm>
    </form>
  );
};

export default PasswordChangeModal;
