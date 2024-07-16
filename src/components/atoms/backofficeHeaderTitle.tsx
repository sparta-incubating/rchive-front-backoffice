import { links } from '@/constants/backoffcicePath.constant';
import { usePathname } from 'next/navigation';

const BackofficeHeaderTitle = () => {
  const pathName = usePathname();

  return (
    <h1 className="text-[24px] font-bold">
      {links.filter((link) => link.href === pathName)[0].title}
    </h1>
  );
};
export default BackofficeHeaderTitle;
