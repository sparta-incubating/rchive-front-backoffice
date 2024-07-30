'use client';

import { postRoleApply } from '@/api/authApi';
import Button from '@/components/atoms/button';
import SelectFormBox from '@/components/organisms/selectFormBox';
import useGetPeriod from '@/hooks/useGetPeriod';
import { RoleFormSchema } from '@/types/role.types';
import { SelectOptionType } from '@/types/signup.types';
import { roleSchema } from '@/validators/auth/role.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface RoleSelectFormProps {
  trackRole: string;
}

const RoleSelectForm = ({ trackRole }: RoleSelectFormProps) => {
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
    console.log({ response });
  };

  return (
    <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
      <section className="flex w-[520px] flex-col items-center gap-5 rounded-[12px] bg-white pb-7 pt-14">
        <span className="text-center text-xl font-medium text-gray-900">
          {trackRole === 'PM' ? '트랙 선택' : '트랙 및 기수 선택'}
        </span>
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

        <Button
          variant="primary"
          className="mt-4 w-[360px]"
          disabled={!isValid}
        >
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

export default RoleSelectForm;
