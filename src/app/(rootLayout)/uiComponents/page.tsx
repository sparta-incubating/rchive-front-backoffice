'use client';

import Button from '@/components/atoms/button';
import UploadContainer from '@/components/molecules/uploadContainer';
import { createToast } from '@/utils/toast';
import NameForm from '@/components/molecules/form/NameForm';
import BirthdayForm from '@/components/molecules/form/BirthdayForm';
import PasswordForm from '@/components/molecules/form/PasswordForm';
import PhoneForm from '@/components/molecules/form/PhoneForm';

const UiComponents = () => {
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
      <div>
        <h1>Thumbnail test</h1>
        <UploadContainer />
      </div>
      {/*<div>
        <Modal>
          <SignupModal></SignupModal>
        </Modal>
      </div>*/}
      <div>
        <h1>toast test</h1>
        <Button
          size={'sm'}
          onClick={() =>
            createToast('게시물 작성이 완료되었습니다.', 'primary')
          }
        >
          create Toast
        </Button>
      </div>
      <PasswordForm /> <br />
      <NameForm /> <br />
      <PhoneForm /> <br />
      <BirthdayForm /> <br />
    </>
  );
};

export default UiComponents;
