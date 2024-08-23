import { auth } from '@/auth';
import CustomError from '@/components/atoms/customError';
import PostFormContainer from '@/components/organisms/postFormContainer';
import BackofficePage from '@/components/pages/backofficePage';
import { TagContextProvider } from '@/context/tag.context';
import { postFetchData } from '@/types/posts.types';
import { createServerAPI } from '@/utils/serverAPI';
import axios from 'axios';
import React from 'react';

const PostUpdate = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const serverAPI = await createServerAPI();
  const session = await auth();
  const trackName = session?.user.trackName;
  const period = session?.user.loginPeriod;
  try {
    const response = await serverAPI.get(
      `/apis/v1/backoffice/post/${postId}?trackName=${trackName}&loginPeriod=${period}`,
    );
    const postData = { ...response.data.data, postId } as postFetchData;

    return (
      <BackofficePage>
        <TagContextProvider>
          <PostFormContainer postData={postData} />
        </TagContextProvider>
      </BackofficePage>
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error?.response?.data;
      const status = error?.response?.status;

      return <CustomError errorData={{ status, data }}></CustomError>;
    }
  }
};

export default PostUpdate;
