import Button from '@/components/atoms/button';
import FormField from '@/components/Molecules/FormField';
import EmailForm from '@/components/Organisms/EmailForm';

const Home = () => {
  return (
    <>
      <div className="text-6xl font-bold">르탄이의 아카이브</div>
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
      </div>

      <hr />
      <div>테스트 코드 작성 부분</div>
      <br />
      <FormField
        label="테스트1"
        htmlFor="test"
        labelProps={{}}
        inputProps={{ type: 'text', placeholder: '이메일' }}
        variant="primary"
      />

      <FormField
        label="테스트2"
        htmlFor="test"
        labelProps={{}}
        inputProps={{ type: 'text', placeholder: '비밀번호' }}
        variant="primary"
      />

      <br />
      <div>테스트2</div>
      <EmailForm
        label="테스트"
        htmlFor="test"
        labelProps={{}}
        inputProps={{ type: 'text', placeholder: '비밀번호 확인' }}
        variant="primary"
      />

      <EmailForm
        label="테스트"
        htmlFor="test"
        labelProps={{}}
        inputProps={{ type: 'text', placeholder: '비밀번호 확인' }}
        variant="secondary"
      />
    </>
  );
};

export default Home;
