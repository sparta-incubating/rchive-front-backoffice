import TestComponent from '@/app/(rootLayout)/(backofficeLayout)/(home)/_components/testComponent';
import { cookies } from 'next/headers';

const Home = () => {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('Refresh');

  return <TestComponent refreshToken={refreshToken + ''}></TestComponent>;
};

export default Home;
