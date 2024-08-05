import OfficeCategory from '@/components/atoms/officeCategory';
import TagContainer from '@/components/organisms/tagContainer';

const Home = () => {
  return (
    <>
      <div className="w-full">
        <h1>Home</h1>
        <TagContainer placeholder="태그 입력 최대 개수는 10개까지 가능해요." />

        <br />
        <OfficeCategory />
      </div>
    </>
  );
};

export default Home;
