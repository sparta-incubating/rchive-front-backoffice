import { getTrackNames } from '@/api/client/categoryApi';
import { TractTypeResponse } from '@/types/posts.types';
import { SelectOptionType } from '@/types/signup.types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useTrackName = () => {
  const [trackNameOptions, setTrackNameOptions] = useState<SelectOptionType[]>(
    [],
  );
  const { data: trackNamesData } = useQuery<TractTypeResponse>({
    queryKey: ['trackName'],
    queryFn: getTrackNames,
  });

  useEffect(() => {
    if (trackNamesData?.data.trackNameList) {
      setTrackNameOptions(
        trackNamesData.data.trackNameList.map((trackName) => ({
          value: trackName.key,
          label: trackName.value,
          selected: false,
        })),
      );
    }
  }, [trackNamesData]);
  return { trackNamesData, trackNameOptions };
};

export default useTrackName;
