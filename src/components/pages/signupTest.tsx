'use client';

import SignupModal from '@/components/pages/signupModal';
import { Button } from '@/components/ui/button';
import { useModalContext } from '@/context/modal.context';
import { signupModalType } from '@/types/signup.types';

const SignupTest = () => {
  const { open } = useModalContext();

  const handleSignupModalOpen = () => {
    open(<SignupModal signupModalType={signupModalType.MANAGER} />, false);
  };

  return (
    <section className="flex flex-col">
      <h2>회원가입</h2>
      <Button variant="default" onClick={handleSignupModalOpen}>
        회원가입
      </Button>
    </section>
  );
};

export default SignupTest;
