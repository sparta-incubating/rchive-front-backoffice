'use client';

import refreshIcon from '@/../public/assets/icons/refresh.svg';
import refreshDisableIcon from '@/../public/assets/icons/refreshDisable.svg';
import { getNotionPageData, patchNotionContent } from '@/api/client/postApi';
import CategoryBox from '@/components/atoms/category/categoryBox';
import PostIsOpenSelectBoxCategory from '@/components/atoms/category/postIsOpenSelectBoxCategory';
import RefreshButton from '@/components/atoms/refreshButton';
import useLoadingProgress from '@/hooks/useLoadingProgress';
import { setPostId } from '@/redux/slice/postCheckBox.slice';
import { useAppDispatch, useAppSelector } from '@/redux/storeConfig';
import { PostContentType } from '@/types/posts.types';
import { extractPageId } from '@/utils/notion/notionAPI';
import { createToast } from '@/utils/toast';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

interface PostsTableRowProps {
  postData: PostContentType;
}

const PostsTableRow = ({ postData }: PostsTableRowProps) => {
  const dispatch = useAppDispatch();
  const postIds = useAppSelector((state) => state.postCheckBoxSlice.postIds);
  const { period: loginPeriod, trackName } = useAppSelector(
    (state) => state.authSlice,
  );

  const [checked, setChecked] = useState<boolean>(false);

  const { setLoadingMessage, setIsSubmitLoading } = useLoadingProgress();

  const handleCheckChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      dispatch(setPostId({ postId: postData.postId }));
    },
    [dispatch, postData.postId],
  );

  const handleRefreshContent = useCallback(async () => {
    if (!postData.contentLink) return;

    // Progress 출력
    setIsSubmitLoading(true);
    setLoadingMessage('노션 자료를 찾아오는 중...');

    // content data 가져오기
    const responseNotionData = await getNotionPageData(
      extractPageId(postData.contentLink!)!,
    );

    setLoadingMessage('데이터를 서버에 등록 중...');
    // server data patch

    await patchNotionContent(
      trackName,
      Number(loginPeriod),
      { content: responseNotionData, contentLink: postData.contentLink },
      Number(postData.postId),
    );

    setIsSubmitLoading(false);
    createToast('게시물의 콘텐츠 수정이 완료되었습니다.', 'primary');
  }, [postData.contentLink, setIsSubmitLoading, setLoadingMessage]);

  useEffect(() => {
    setChecked(postIds.includes(postData.postId));
  }, [postIds, postData.postId]);

  return (
    <tr
      key={postData.postId}
      className="flex h-[64px] items-center border-b text-sm hover:bg-blue-50"
    >
      <td className="ml-6 mr-7 flex h-5 w-5 items-center justify-center">
        <CategoryBox text="" onChange={handleCheckChange} checked={checked} />
      </td>
      <td className="w-[65.5px] text-gray-700">
        <div className="relative h-[38px] w-full">
          <Image
            src={
              postData.thumbnailUrl ||
              '/backoffice/assets/icons/defaultThumbnail.png'
            }
            alt={postData.title}
            style={{ borderRadius: '4px' }}
            fill
          />
        </div>
      </td>
      <td className="w-60 px-4 text-gray-700">
        <Link href={`/posts/${postData.postId}`}>
          <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
            {postData.title}
          </span>
        </Link>
      </td>
      <td className="w-[153px] px-2.5 text-gray-700">
        {postData.postType.value}
      </td>
      <td className="w-[97px] px-2.5 text-gray-700">{postData.tutor}</td>
      <td className="w-[69px] text-gray-700">{postData.period}기</td>
      <td className="w-[137px] px-2.5 text-gray-700">
        <PostIsOpenSelectBoxCategory
          isOpen={postData.isOpened}
          postId={String(postData.postId)}
        />
      </td>
      <td className="w-[106px] text-gray-700">{postData.uploadedAt}</td>
      <td className="w-[74px] text-gray-700">
        <RefreshButton
          disabled={!postData.contentLink}
          onClick={handleRefreshContent}
        >
          {postData.contentLink ? (
            <Image src={refreshIcon} alt="새로고침 버튼" fill />
          ) : (
            <Image src={refreshDisableIcon} alt="새로고침 비활성 버튼" fill />
          )}
        </RefreshButton>
      </td>
    </tr>
  );
};

export default PostsTableRow;
