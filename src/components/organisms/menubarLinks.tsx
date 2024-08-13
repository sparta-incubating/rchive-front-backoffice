import MenuLinkCard from '@/components/molecules/menuLinkCard';

const MenubarLinks = () => {
  return (
    <nav>
      <MenuLinkCard url="/admin">권한 관리</MenuLinkCard>
      <MenuLinkCard url="/posts/write">게시물 작성</MenuLinkCard>
      <MenuLinkCard url="/posts">게시물 관리</MenuLinkCard>
      <MenuLinkCard url="/porfile">프로필 관리</MenuLinkCard>
    </nav>
  );
};

export default MenubarLinks;
