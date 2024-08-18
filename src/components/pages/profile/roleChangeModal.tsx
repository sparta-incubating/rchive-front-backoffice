import { useProfileUpdate } from '@/api/profile/useMutation';
import { usePeriodListQuery } from '@/api/profile/useQuery';
import ProfileChangeForm from '@/components/organisms/profileChangeForm';
import SelectFormBox from '@/components/organisms/selectFormBox';
import { RoleChangeModalProps } from '@/types/profile.types';
import { SelectOptionType } from '@/types/signup.types';
import { createToast } from '@/utils/toast';
import { roleSchema } from '@/validators/auth/role.validator';
import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const RoleChangeModal = ({ onClose, trackRole }: RoleChangeModalProps) => {
  const {
    handleSubmit,
    watch,
    control,
    formState: { isValid, errors },
  } = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    mode: 'onChange',
    defaultValues: {
      trackName: '',
      period: '',
      trackRole: '',
    },
  });

  const periodList = usePeriodListQuery(watch('trackName'));

  const periodOptions = periodList?.map((item: number) => ({
    value: `${item}`,
    label: `${item}기`,
    selected: false,
  }));

  const { updateRoleMutate } = useProfileUpdate();

  const onSubmit = async (data: z.infer<typeof roleSchema>) => {
    const { trackName, period } = data;
    const roleChangeInfo = {
      trackName,
      period: period as string,
      trackRole,
    };

    try {
      await updateRoleMutate.mutateAsync(roleChangeInfo);
      createToast('권한 수정이 요청되었습니다.', 'primary');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('권한 수정 요청에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProfileChangeForm
        label="권한요청 페이지입니다."
        onClose={onClose}
        isValid={isValid}
      >
        <p className="text-center text-gray-300">
          해당하는 직책과 트랙 및 기수를 입력하세요
        </p>
        <Controller
          name="trackName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectFormBox
              className="w-[360px]"
              options={trackOptions}
              label={'트랙'}
              onSelect={onChange}
              value={value}
            />
          )}
        />
        {errors.trackName && (
          <p className="text-red-500">{errors.trackName.message}</p>
        )}

        <Controller
          name="period"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectFormBox
              className="w-[360px]"
              options={periodOptions || []}
              label={'기수'}
              onSelect={onChange}
              value={value!}
            />
          )}
        />
        {errors.period && (
          <p className="text-red-500">{errors.period.message}</p>
        )}
      </ProfileChangeForm>
    </form>
  );
};

export default RoleChangeModal;

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
