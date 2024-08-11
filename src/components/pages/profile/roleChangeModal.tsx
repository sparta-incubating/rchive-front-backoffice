import { useProfileUpdate } from '@/api/profile/useMutation';
import IconButton from '@/components/atoms/iconButton';
import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import Label from '@/components/atoms/label';
import InputField from '@/components/molecules/InputField';
import SelectFormBox from '@/components/organisms/selectFormBox';
import { SelectOptionType } from '@/types/signup.types';
import { roleSchema } from '@/validators/auth/role.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

interface RoleChangeModalProps {
  trackName: string;
  period: string;
  trackRole: string;
  onClose: () => void;
}
const RoleChangeModal = ({
  onClose,
  trackName,
  period,
  trackRole,
}: RoleChangeModalProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      trackName: '',
      period: '',
      trackRole,
    },
  });

  const { updateRoleMutate } = useProfileUpdate();

  const onSubmit = async (data: z.infer<typeof roleSchema>) => {
    if (trackRole) {
      try {
        await updateRoleMutate.mutateAsync(data);
        alert('권한 수정 요청이 성공적으로 변경되었습니다.');
        onClose();
      } catch (error) {
        console.error('Error updating password:', error);
        alert('권한 수정 요청에 실패했습니다. 다시 시도해 주세요.');
      }
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
          <p className="text-center text-xl">권한 수정요청</p>
        </div>
        <div className="h-[250px] px-[24px]">
          <div className="flex flex-col gap-[10px]">
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
                <Label htmlFor="period">기수</Label>
                <Input
                  {...register('period')}
                  placeholder="*1기라면 '1'만 작성해주세요"
                  className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                />
              </InputField>
            </InputContainer>
            {/* <Controller
              name="period"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectFormBox
                  className="w-[360px]"
                  options={period}
                  label={'기수'}
                  onSelect={onChange}
                  value={value!}
                />
              )}
            /> */}
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
const trackOptions: SelectOptionType[] = [
  {
    value: 'UNITY',
    label: '게임 개발(Unity)',
    selected: false,
  },
  {
    value: 'NODEJS',
    label: '게임 개발(Node.js)',
    selected: false,
  },
  {
    value: 'SPRING_JAVA',
    label: '백엔드 개발(Java+Spring)',
    selected: false,
  },
  {
    value: 'SPRING_KOTLIN',
    label: '백엔드 개발(Kotlin+Spring)',
    selected: false,
  },
  {
    value: 'FRONT_REACT',
    label: '프론트엔드 개발',
    selected: false,
  },
  {
    value: 'WEB',
    label: 'WEB',
    selected: false,
  },
  {
    value: 'ANDROID',
    label: '안드로이드 앱 개발',
    selected: false,
  },
  {
    value: 'IOS',
    label: 'Ios 앱 개발',
    selected: false,
  },
  {
    value: 'DATA',
    label: 'DATA',
    selected: false,
  },
  {
    value: 'UXUI',
    label: 'UX/UI 디자인',
    selected: false,
  },
];
export default RoleChangeModal;
