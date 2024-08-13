import { ComponentProps } from 'react';

interface Props extends ComponentProps<'button'> {}

function CloseButton({ ...props }: Props) {
  return (
    <button className="z-10 h-5 w-5" {...props}>
      <div className="relative before:absolute before:left-[50%] before:top-[50%] before:h-[10px] before:w-[1px] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[-45deg] before:transform before:bg-secondary-500 before:content-[''] after:absolute after:left-[50%] after:top-[50%] after:h-[10px] after:w-[1px] after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:transform after:bg-secondary-500 after:content-['']"></div>
    </button>
  );
}

export default CloseButton;
