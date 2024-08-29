import MenuLinkCard from '@/components/molecules/menuLinkCard';

const MenubarLinks = () => {
  return (
    <nav>
      <MenuLinkCard url="/backoffice/admin">권한 설정</MenuLinkCard>
      <MenuLinkCard url="/backoffice/posts/write">게시물 작성</MenuLinkCard>
      <MenuLinkCard url="/backoffice/posts">게시물 관리</MenuLinkCard>
      <MenuLinkCard url="/backoffice/profile">프로필 관리</MenuLinkCard>
    </nav>
  );
};

export default MenubarLinks;
