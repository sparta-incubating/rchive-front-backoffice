import MenuLinkCard from '@/components/molecules/menuLinkCard';
import { links } from '@/constants/backoffcicePath.constant';

const MenubarLinks = () => {
  return (
    <nav>
      {links.map((link, index) => (
        <MenuLinkCard key={link.href + index} link={link} />
      ))}
    </nav>
  );
};

export default MenubarLinks;
