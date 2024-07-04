import SignupContainer from '@/components/organisms/signupContainer';
import SignupHeader from '@/components/molecules/signupHeader';
import StepIndicator from '@/components/atoms/stepIndicator';
import Button from '@/components/atoms/button';
import Modal from '@/components/atoms/modal';
import AcceptTermsGroup from '@/components/organisms/acceptTermsGroup';

const SignupModal = () => {
  return (
    <Modal>
      <SignupContainer>
        <SignupHeader />
        <header className="flex gap-[23px] px-7">
          <StepIndicator variant={'active'} />
          <StepIndicator variant={'inactive'} />
        </header>

        <AcceptTermsGroup />

        <Button disabled={true} className="mb-5 w-80 px-7">
          다음
        </Button>
      </SignupContainer>
    </Modal>
  );
};

export default SignupModal;
