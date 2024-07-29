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
    <MenubarLink active={isActive} href={link.href}>
      <article
        data-active={isActive}
        className="group h-16 w-[292px] rounded-[12px] px-9 py-5 hover:bg-[#1F2122] data-[active=true]:bg-[#1F2122]"
      >
        {link.title}
      </article>
    </MenubarLink>
  );
};

export default MenuLinkCard;
