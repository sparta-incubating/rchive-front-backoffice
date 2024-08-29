'use client';

import UploadThumbnail from '@/components/atoms/uploadThumbnail';
import UploadThumbnailText from '@/components/atoms/uploadThumbnailText';
import useDebounce from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

const UploadContainer = () => {
  const [url, setUrl] = useState('');
  const [ogImage, setOgImage] = useState('');
  const debouncedURL = useDebounce<string>(url, 500);

  const fetchOgImage = async (inputUrl: string) => {
    try {
      const response = await fetch(
        `/api/backoffice/og-image?url=${encodeURIComponent(inputUrl)}`,
      );
      const data = await response.json();
      setOgImage(data.ogImage);
    } catch (error) {
      console.error('OG 이미지를 가져오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    if (debouncedURL) {
      fetchOgImage(debouncedURL);
    } else {
      setOgImage('');
    }
  }, [debouncedURL]);

  // const handleUrlChange = (newUrl: string) => {
  //   setUrl(newUrl);
  // };

  return (
    <div className="flex w-full gap-4">
      <UploadThumbnail variant={ogImage ? 'image' : 'text'}>
        {ogImage ? (
          <img
            src={ogImage}
            alt="OG 이미지"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            <UploadThumbnailText>썸네일</UploadThumbnailText>
            <UploadThumbnailText>자동 업로드</UploadThumbnailText>
          </>
        )}
      </UploadThumbnail>
      {/* <UploadInput value={url} onClick={handleUrlChange} /> */}
      {/* 추후 삭제 로직 */}
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)} // 입력된 URL을 setUrl로 업데이트
        placeholder="URL을 입력하세요"
        className="hidden"
      />
      {/* 추후 삭제 로직*/}
    </div>
  );
};

export default UploadContainer;
