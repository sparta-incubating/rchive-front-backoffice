import { LoginTest } from '@/app/(auth)/LoginTest';
import TagContainer from '@/components/organisms/tagContainer';
import SignupTest from '@/components/pages/signupTest';
import { Calendar } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      <h1>Home</h1>
      <SignupTest />
      <TagContainer placeholder="태그 입력 최대 개수는 10개까지 가능해요." />
      <Calendar />
      <LoginTest />
    </div>
  );
};

export default Home;
