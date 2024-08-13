import Calendar from '@/components/molecules/calendar';
import TitleContainer from '@/components/molecules/post/titleContainer';
import { PostsFormSchema } from '@/types/posts.types';
import { Control } from 'react-hook-form';

interface CalendarContainerProps {
  control: Control<PostsFormSchema>;
}

const CalendarContainer = ({ control }: CalendarContainerProps) => {
  return (
    <TitleContainer title="작성날짜">
      <Calendar
        control={control}
        className="box-border !h-[64px] min-h-[43px] !w-[334px] min-w-[334px] p-5"
      />
    </TitleContainer>
  );
};

export default CalendarContainer;
