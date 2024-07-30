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
import { DateRange } from 'react-day-picker';

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <div className={classMerge('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={classMerge(
              'flex w-fit min-w-[100px] items-center justify-between rounded-full px-2.5 py-2 text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <div className="flex gap-2.5 text-xs">
              <CalendarIcon className="h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {dayjs(date.from).format('YY/MM/DD')} -{' '}
                    {dayjs(date.to).format('YY/MM/DD')}
                  </>
                ) : (
                  dayjs(date.from).format('YY/MM/DD')
                )
              ) : (
                <span>기간</span>
              )}
              <div className="relative h-5 w-5">
                <Image
                  src={'/assets/icons/selectArrow.svg'}
                  alt={'select arrow icon'}
                  fill
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
            onSelect={setDate}
            numberOfMonths={1}
            locale={ko}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
