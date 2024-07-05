import Button from '@/components/atoms/button';
import InputField from '@/components/Molecules/InputField';
import PageDiv from '@/components/Molecules/PageDiv';

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
      <InputField
        label="테스트1"
        htmlFor="test"
        labelProps={{}}
        inputProps={{ type: 'text', placeholder: '이메일' }}
      />

      <InputField
        label="테스트2"
        htmlFor="test"
        labelProps={{}}
        inputProps={{ type: 'text', placeholder: '비밀번호' }}
        variant="primary"
      />

      <br />
      <br />
      <br />

      <PageDiv>
        <InputField
          label="테스트2"
          htmlFor="test"
          labelProps={{}}
          inputProps={{ type: 'text', placeholder: '비밀번호' }}
          variant="primary"
        />
        <Button size="sm" variant="submit" disabled={true}>
          primary
        </Button>
      </PageDiv>
      <PageDiv>
        <InputField
          label="테스트2"
          htmlFor="test"
          labelProps={{}}
          inputProps={{ type: 'text', placeholder: '비밀번호' }}
          variant="primary"
        />
      </PageDiv>
    </>
  );
};

export default Home;
