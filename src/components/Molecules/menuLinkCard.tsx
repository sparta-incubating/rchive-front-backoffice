import MenubarLink from '@/components/atoms/menubarLink';
import { Links } from '@/types/menubar.types';
import { useState } from 'react';

interface MenuLinkCardProps {
  link: Links;
}

const MenuLinkCard = ({ link }: MenuLinkCardProps) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <article
      data-active={active}
      className="group h-16 w-[292px] rounded-[12px] px-9 py-5 hover:bg-[#1F2122] data-[active=true]:bg-[#1F2122]"
    >
      <MenubarLink active={active} href={link.href}>
        {link.title}
      </MenubarLink>
    </article>
  );
};

export default MenuLinkCard;
