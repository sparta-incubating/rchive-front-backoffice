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
      {/* <div className="text-6xl font-bold">르탄이의 아카이브</div>
      <div className="text-[50px] font-bold">르탄이의 아카이브</div>
      <div className="text-5xl font-bold">르탄이의 아카이브</div>
      <div className="text-[40px] font-bold">르탄이의 아카이브</div>
      <div>
        <Button>primary</Button>
        <Button disabled={true}>primary</Button>
        <Button size="sm">primary</Button>
        <Button size="sm" className="w-[300px] bg-amber-500">
          primary
        </Button>
      </div>
      <div>
        <Button variant="secondary">secondary</Button>
        <Button variant="secondary" disabled={true}>
          secondary
        </Button>
        <Button variant="secondary" size="sm">
          secondary
        </Button>
      </div>
      <div>
        <Button variant="submit">submit</Button>
        <Button variant="submit" disabled={true}>
          submit
        </Button>
        <Button variant="submit" size="sm">
          submit
        </Button>
      </div> */}

      {/* 회원가입 UI */}
      <NameForm />
      {/* <BirthdayContainer />
      <EmailContainer />
      <PasswordContainer />
      <PhoneContainer /> */}
      <br />
      <br />
    </>
  );
};

export default Home;
