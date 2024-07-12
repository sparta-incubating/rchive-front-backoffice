import MenuLinkCard from '@/components/molecules/menuLinkCard';
import { Links } from '@/types/menubar.types';

interface MenubarLinksProps {
  links: Links[];
}

const MenubarLinks = ({ links }: MenubarLinksProps) => {
  return (
    <nav>
      {links.map((link, index) => (
        <MenuLinkCard key={link.href + index} link={link} />
      ))}
    </nav>
  );
};

export default MenubarLinks;
