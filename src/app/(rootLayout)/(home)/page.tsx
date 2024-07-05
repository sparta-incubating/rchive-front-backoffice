import Button from '@/components/atoms/button';
import InputField from '@/components/Molecules/InputField';
import Container from '@/components/Molecules/Container';

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

      <br />
      <InputField
        label="이메일"
        htmlFor="email"
        labelProps={{}}
        inputProps={{ type: 'text', placeholder: '이메일 입력' }}
      />

      <br />
      <br />
      <br />
      <Container>
        <InputField
          label="이메일"
          htmlFor="email"
          labelProps={{}}
          inputProps={{ type: 'text', placeholder: '이메일 입력' }}
          variant="primary"
        />
        <Button size="sm" variant="submit" disabled={true}>
          중복 확인
        </Button>
      </Container>
      {!Container ? (
        ''
      ) : (
        <p className="text-primary-400">
          영문, 숫자 조합으로 6자 이상 입력해 주세요
        </p>
      )}
      <br />
      <br />
      <br />
      <Container>
        <InputField
          label="테스트2"
          htmlFor="test"
          labelProps={{}}
          inputProps={{
            type: 'text',
            placeholder: '비밀번호',
            className: 'peer',
          }}
          variant="primary"
        />
        <p className="invisible text-sm text-primary-500 peer-invalid:visible">
          영문, 숫자 조합으로 6자 이상 입력해 주세요
        </p>
      </Container>
    </>
  );
};

export default Home;
