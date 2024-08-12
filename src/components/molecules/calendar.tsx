'use client';

import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PostsFormSchema } from '@/types/posts.types';
import { cn } from '@/utils/utils';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { Control, Controller } from 'react-hook-form';

interface CalendarProps {
  control: Control<PostsFormSchema>;
  className?: string;
}

const Calendar = ({ control, className }: CalendarProps) => {
  return (
    <Popover>
      <Controller
        name="uploadedAt"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !value && 'text-muted-foreground',
                  className,
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? (
                  dayjs(value).format('YYYY-MM-DD')
                ) : (
                  <span>날짜를 선택해주세요.</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="top-0 w-auto p-0" sideOffset={-1020}>
              <CalendarComponent
                mode="single"
                selected={value || undefined}
                onSelect={onChange}
                locale={ko}
                initialFocus
              />
            </PopoverContent>
          </>
        )}
      />
    </Popover>
  );
};

export default Calendar;
