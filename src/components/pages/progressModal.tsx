import Modal from '@/components/atoms/modal';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

const ProgressModal = ({ children }: PropsWithChildren) => {
  return (
    <Modal variant="backOffice" inboardClassName="p-0" bgColor="black">
      <section className="flex h-[98px] w-[414px] items-center justify-center gap-4 px-6 py-4">
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
        <div className="flex flex-col">
          <span className="text-lg font-medium">{children}</span>
          <span className="text-lg font-medium">
            다른 페이지로 이동 시 저장되지 않아요!
          </span>
        </div>
      </section>
    </Modal>
  );
};
export default ProgressModal;
