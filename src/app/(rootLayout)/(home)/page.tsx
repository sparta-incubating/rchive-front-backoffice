import Button from '@/components/atoms/button';
import InputField from '@/components/molecules/InputField';
import InputForm from '@/components/atoms/InputContainer';
import Input from '@/components/atoms/input';
import NameForm from '@/components/molecules/form/NameForm';
import BirthdayForm from '@/components/molecules/form/BirthdayForm';
import EmailForm from '@/components/molecules/form/EmailForm';
import PasswordForm from '@/components/molecules/form/PasswordForm';
import PhoneForm from '@/components/molecules/form/PhoneForm';

const Home = () => {
  return (
    <>
      {/* 회원가입 UI */}
      <EmailForm />
      <PasswordForm />
      <NameForm />
      <PhoneForm />
      <BirthdayForm />
    </>
  );
};

export default Home;
