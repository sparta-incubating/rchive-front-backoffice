import Image from 'next/image';
import { ComponentProps } from 'react';

interface SocialButtonProps extends ComponentProps<'button'> {
  image: string;
}

const SocialButton = ({ image, ...props }: SocialButtonProps) => {
  return (
    <button
      className="relative h-[56px] w-[56px] rounded-full border border-gray-200 p-[11.6px]"
      {...props}
    >
      <Image src={image} width={31} height={31} alt="test" />
    </button>
  );
};

export default SocialButton;
