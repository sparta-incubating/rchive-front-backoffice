'use client';

import { postRoleApply } from '@/api/authApi';
import Button from '@/components/atoms/button';
import SelectFormBox from '@/components/organisms/selectFormBox';
import useGetPeriod from '@/hooks/useGetPeriod';
import { RoleFormSchema } from '@/types/role.types';
import { SelectOptionType } from '@/types/signup.types';
import { roleSchema } from '@/validators/auth/role.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface RoleSelectFormProps {
  trackRole: string;
  children: ReactNode;
}

const ProfileChangeForm = ({ trackRole, children }: RoleSelectFormProps) => {
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

  const period = useGetPeriod(watch('trackName'), trackRole);

  const onSubmit = async (data: RoleFormSchema) => {
    const response = await postRoleApply(data);
    if (response.status === 200) {
      window.location.href = '/role/result';
    }
  };

  return (
    <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
      <section className="flex h-[511px] w-[520px] flex-col items-center gap-5 rounded-[12px] border bg-white pb-7 pt-14">
        {children}
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
        <div className="w-[360px] rounded-[12px] bg-blue-50 p-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-900">기수</label>
          </div>
          <div className="flex cursor-pointer justify-between">
            <span className="text-md relative flex justify-self-start font-semibold text-gray-300">
              기수 입력
            </span>
          </div>
        </div>
        {errors.trackName && (
          <p className="text-red-500">{errors.trackName.message}</p>
        )}
        <Button variant="primary" className="mt-4 w-[360px]" disabled={isValid}>
          완료
        </Button>
      </section>
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

export default ProfileChangeForm;
