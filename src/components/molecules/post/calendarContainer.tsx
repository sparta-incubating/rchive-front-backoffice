import Calendar from '@/components/molecules/calendar';
import TitleContainer from '@/components/molecules/post/titleContainer';

const CalendarContainer = () => {
  return (
    <TitleContainer title="작성날짜">
      <Calendar className="box-border !h-[64px] min-h-[43px] !w-[334px] min-w-[334px] p-5" />
    </TitleContainer>
  );
};

export default CalendarContainer;
