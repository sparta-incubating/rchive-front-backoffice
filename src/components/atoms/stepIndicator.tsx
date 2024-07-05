import { cva, VariantProps } from 'class-variance-authority';

const stepIndicatorVariants = cva('w-[180px] border-[6px] h-0 rounded-full', {
  variants: {
    variant: {
      active: 'border-primary-400',
      inactive: 'border-blue-100',
    },
  },
});

const StepIndicator = ({
  variant,
}: VariantProps<typeof stepIndicatorVariants>) => {
  return <div className={stepIndicatorVariants({ variant })}></div>;
};

export default StepIndicator;
