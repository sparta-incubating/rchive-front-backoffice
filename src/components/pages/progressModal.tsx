import Modal from '@/components/atoms/modal';
import Image from 'next/image';
import React from 'react';

const ProgressModal = () => {
  return (
    <Modal variant="backOffice" bgColor="black">
      <section className="flex h-[98px] w-[352px] items-center justify-center gap-4 px-6">
        <div className="flex h-[65px] w-[64px] items-center justify-center rounded-full bg-primary-50 p-2.5">
          <div className="relative h-[50px] w-[40px]">
            <Image
              src={'/assets/icons/gif/rtanRun.gif'}
              alt={'progress gif'}
              style={{ transform: 'scaleX(-1)' }}
              fill
            />
          </div>
        </div>
        <span className="text-lg font-medium">자료를 가져오는중...</span>
      </section>
    </Modal>
  );
};
export default ProgressModal;
