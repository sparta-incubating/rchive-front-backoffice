'use client';

import { PostForm } from '@/class/postForm';
import PreviewContainer from '@/components/organisms/preview/previewContainer';
import PostDetail from '@/components/pages/postDetail/postDetail';
import { useEffect, useState } from 'react';

const Preview = () => {
  const [formData, setFormData] = useState<PostForm | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'FORM_DATA') {
        setFormData(event.data.data);
      }
    };

    window.addEventListener('message', handleMessage);
    window.opener.postMessage({ type: 'POPUP_LOADED' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!formData) return <div>Loading...</div>;

  return (
    <PreviewContainer>
      <PostDetail postData={formData} />
    </PreviewContainer>
  );
};

export default Preview;
