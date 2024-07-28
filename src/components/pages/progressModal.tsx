import Modal from '@/components/atoms/modal';
import Image from 'next/image';
import React from 'react';

const ProgressModal = () => {
  return (
    <Modal backDropClassName="bg-black/50 left-[292px] w-[calc(100%-292px)]">
      <section className="flex h-[98px] w-[352px] items-center justify-center gap-4 px-6">
        <div className="relative h-[65px] w-[64px] p-2.5">
          <Image
            src={'/assets/icons/gif/secondaryProgress.gif'}
            alt={'progress gif'}
            fill
          />
        </div>
        <span className="text-lg font-medium">자료를 가져오는중...</span>
      </section>
    </Modal>
  );
};
export default ProgressModal;
