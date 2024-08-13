import MenubarLink from '@/components/atoms/menubarLink';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface MenuLinkCardProps {
  url: string;
  children: ReactNode;
}

const MenuLinkCard = ({ url, children }: MenuLinkCardProps) => {
  const pathName = usePathname();
  const isActive = pathName === url;

  return (
    <MenubarLink active={isActive} href={url}>
      <article
        data-active={isActive}
        className="group h-16 w-[292px] rounded-[12px] px-9 py-5 hover:bg-[#1F2122] data-[active=true]:bg-[#1F2122]"
      >
        {children}
      </article>
    </MenubarLink>
  );
};

export default MenuLinkCard;
