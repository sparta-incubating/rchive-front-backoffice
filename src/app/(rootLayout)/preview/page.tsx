'use client';

import { PostForm } from '@/class/postForm';
import Modal from '@/components/atoms/modal';
import PreviewContainer from '@/components/organisms/preview/previewContainer';
import PostDetail from '@/components/pages/postDetail/postDetail';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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

  const handleClose = () => {
    window.close();
  };

  const handleSubmit = () => {
    window.opener.postMessage({ type: 'SUBMIT_FORM' }, '*');
    window.close();
  };

  if (!formData)
    return (
      <Modal>
        <section className="flex h-[98px] w-[414px] items-center justify-center gap-4 px-6 py-4">
          <div className="flex h-[65px] w-[64px] items-center justify-center rounded-full bg-primary-50 p-2.5">
            <div className="relative h-[50px] w-[40px]">
              <Image
                src={'/backoffice/assets/icons/gif/rtanRun.gif'}
                alt={'progress gif'}
                style={{ transform: 'scaleX(-1)' }}
                fill
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-medium">Loading...</span>
          </div>
        </section>
      </Modal>
    );

  return (
    <PreviewContainer onClose={handleClose} onSubmit={handleSubmit}>
      <PostDetail postData={formData} />
    </PreviewContainer>
  );
};

export default Preview;
