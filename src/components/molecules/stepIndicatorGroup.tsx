import StepIndicator from '@/components/atoms/select/stepIndicator';

const StepIndicatorGroup = () => {
  return (
    <section className="flex gap-[23px] px-7">
      <StepIndicator variant={'active'} />
      <StepIndicator variant={'inactive'} />
    </section>
  );
};

export default StepIndicatorGroup;
