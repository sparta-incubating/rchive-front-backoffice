import { getSearchTutor } from '@/api/client/postApi';
import { TrackType } from '@/types/posts.types';
import { SelectOptionType } from '@/types/signup.types';
import { useQuery } from '@tanstack/react-query';

const useSearchTutor = (
  trackName: TrackType,
  loginPeriod: string,
  period: string,
) => {
  const { data } = useQuery({
    queryKey: ['tutor', trackName, period],
    queryFn: () =>
      getSearchTutor(trackName, Number(loginPeriod), Number(period), ''),
    enabled: period !== '0',
    retry: 3,
    staleTime: 60 * 1000,
  });

  if (data) {
    return data.data.map((tutor) => ({
      value: String(tutor.tutorId),
      label: tutor.tutorName,
      selected: false,
    })) as SelectOptionType[];
  }
};

export default useSearchTutor;
