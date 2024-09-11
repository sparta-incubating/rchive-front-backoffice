import { getPostTypeNames } from '@/api/client/categoryApi';
import { PostTypeResponse } from '@/types/posts.types';
import { SelectOptionType } from '@/types/signup.types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const usePostTypeNames = () => {
  const [postTypeOptions, setPostTypeOptions] = useState<SelectOptionType[]>(
    [],
  );
  const { data: postTypeNames } = useQuery<PostTypeResponse>({
    queryKey: ['postTypeNames'],
    queryFn: getPostTypeNames,
  });

  useEffect(() => {
    if (postTypeNames?.data) {
      setPostTypeOptions(
        postTypeNames.data
          .filter((postType) => postType.key !== 'Level_All')
          .map((postType) => ({
            value: postType.key,
            label: postType.value,
            selected: false,
          })),
      );
    }
  }, [postTypeNames]);

  return { postTypeOptions, postTypeNames };
};

export default usePostTypeNames;
