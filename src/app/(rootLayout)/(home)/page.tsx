import NameForm from '@/components/molecules/form/NameForm';
import BirthdayForm from '@/components/molecules/form/BirthdayForm';
import EmailForm from '@/components/molecules/form/EmailForm';
import PasswordForm from '@/components/molecules/form/PasswordForm';
import PhoneForm from '@/components/molecules/form/PhoneForm';

const Home = () => {
  return (
    <>
      {/* 회원가입 UI */}
      <EmailForm /> <br />
      <PasswordForm /> <br />
      <NameForm /> <br />
      <PhoneForm /> <br />
      <BirthdayForm /> <br />
    </>
  );
};
export default Home;
