import { useProfileUpdate } from '@/api/profile/useMutation';
import ProfileChangeForm from '@/components/organisms/profileChangeForm';
import SelectFormBox from '@/components/organisms/selectFormBox';
import useGetPeriod from '@/hooks/useGetPeriod';
import { trackOptions } from '@/types/posts.types';
import { RoleChangeModalProps } from '@/types/profile.types';
import { RoleFormSchema } from '@/types/role.types';
import { createToast } from '@/utils/toast';
import { roleSchema } from '@/validators/auth/role.validator';
import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const RoleChangeModal = ({ onClose, trackRole }: RoleChangeModalProps) => {
  const {
    control,
    handleSubmit,
    watch,

    formState: { errors, isValid },
  } = useForm<RoleFormSchema>({
    resolver: zodResolver(roleSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      trackRole,
      trackName: '',
      period: '',
    },
  });

  const watchTrackName = watch('trackName');

  const period = useGetPeriod(watch('trackName'), trackRole);

  const { updateRoleMutate } = useProfileUpdate();

  const onSubmit = async (data: z.infer<typeof roleSchema>) => {
    const { trackName, period } = data;
    const roleChangeInfo = {
      trackName,
      period,
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
        labels={{
          main: '권한 수정 요청 페이지입니다.',
          sub: '해당하는 트랙 및 기수를 입력하세요',
        }}
        onClose={onClose}
        isValid={isValid}
      >
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

        {trackRole === 'APM' && period && (
          <>
            <Controller
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
            />
            {errors.period && (
              <p className="text-red-500">{errors.period.message}</p>
            )}
          </>
        )}
      </ProfileChangeForm>
    </form>
  );
};

export default RoleChangeModal;
