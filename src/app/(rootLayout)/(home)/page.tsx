import BackOfficeMenuBar from '@/components/organisms/backOfficeMenuBar';
import TagContainer from '@/components/organisms/tagContainer';
import SignupTest from '@/components/pages/signupTest';

const Home = () => {
  return (
    <div className="flex min-h-[100vh]">
      <BackOfficeMenuBar />
      <div className="flex flex-col">
        <h1>Home</h1>
        <SignupTest />
        <TagContainer />
      </div>
    </div>
  );
};

export default Home;
