import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';

interface MenubarLinkProps extends ComponentProps<typeof Link> {
  children: ReactNode;
  active: boolean; // true: 활성상태, false: 비활성상태
  href: string;
}

const MenubarLink = ({ children, active, ...props }: MenubarLinkProps) => {
  return (
    <Link {...props}>
      <span
        data-active={active}
        className="font-xl font-bold text-gray-600 group-hover:text-white data-[active=true]:text-white"
      >
        {children}
      </span>
    </Link>
  );
};

export default MenubarLink;
