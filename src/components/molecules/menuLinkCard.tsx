import MenubarLink from '@/components/atoms/menubarLink';
import { Links } from '@/types/menubar.types';
import { usePathname } from 'next/navigation';

interface MenuLinkCardProps {
  link: Links;
}

const MenuLinkCard = ({ link }: MenuLinkCardProps) => {
  const pathName = usePathname();
  const isActive = pathName === link.href;

  return (
    <article
      data-active={isActive}
      className="group h-16 w-[292px] rounded-[12px] px-9 py-5 hover:bg-[#1F2122] data-[active=true]:bg-[#1F2122]"
    >
      <MenubarLink active={isActive} href={link.href}>
        {link.title}
      </MenubarLink>
    </article>
  );
};

export default MenuLinkCard;
