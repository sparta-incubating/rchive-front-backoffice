'use client';

import Button from '@/components/atoms/button';
import SelectFormBox from '@/components/organisms/selectFormBox';
import { RoleFormSchema } from '@/types/role.types';
import { roleSchema } from '@/validators/auth/role.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

interface RoleSelectFormProps {
  role: string;
}

const RoleSelectForm = ({ role }: RoleSelectFormProps) => {
  const { control } = useForm<RoleFormSchema>({
    resolver: zodResolver(roleSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      track: '',
      period: '',
    },
  });

  return (
    <form className="m-auto">
      <section className="flex w-[520px] flex-col items-center gap-5 rounded-[12px] bg-white pb-7 pt-14">
        <span className="text-center text-xl font-medium text-gray-900">
          트랙 선택
        </span>
        <Controller
          name="track"
          control={control}
          render={({ field: { onChange } }) => (
            <SelectFormBox
              className="w-[360px]"
              options={[{ selected: false, label: 'test', value: '1' }]}
              label={'트랙'}
              onSelect={onChange}
              value={''}
            />
          )}
        />

        {role === 'APM' && (
          <Controller
            name="period"
            control={control}
            render={({ field: { onChange } }) => (
              <SelectFormBox
                className="w-[360px]"
                options={[{ selected: false, label: 'test', value: '1' }]}
                label={'기수'}
                onSelect={onChange}
                value={''}
              />
            )}
          />
        )}

        <Button variant="primary" className="mt-4 w-[360px]">
          완료
        </Button>
      </section>
    </form>
  );
};
export default RoleSelectForm;
