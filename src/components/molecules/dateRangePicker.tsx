'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { classMerge } from '@/utils/utils';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';
import { Calendar as CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  setDate: (value: DateRange | undefined) => void;
  date: DateRange | undefined;
}

export function DateRangePicker({
  date,
  setDate,
  className,
}: DateRangePickerProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={classMerge('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={classMerge(
              'flex h-[39px] w-fit min-w-[100px] items-center justify-between rounded-full px-2.5 py-0 text-left font-normal',
              !date && 'text-muted-foreground',
            )}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex items-center gap-2.5">
              <CalendarIcon className="h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    <span className="text-sm font-semibold">
                      {dayjs(date.from).format('YY/MM/DD')}
                    </span>{' '}
                    -{' '}
                    <span className="text-sm font-semibold">
                      {dayjs(date.to).format('YY/MM/DD')}
                    </span>
                  </>
                ) : (
                  dayjs(date.from).format('YY/MM/DD')
                )
              ) : (
                <span className="text-sm font-normal">기간</span>
              )}
              <div className="relative h-[12px] w-[12px]">
                <Image
                  src={'/backoffice/assets/icons/selectArrow.svg'}
                  alt={'select arrow icon'}
                  fill
                  className={`transition-transform duration-500 ${
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(day, selectedDay, activeModifiers, e) => {
              setDate(day || undefined);
            }}
            numberOfMonths={1}
            locale={ko}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
