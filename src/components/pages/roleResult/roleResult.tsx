import { getLastConnectRole } from '@/api/client/authApi';
import Button from '@/components/atoms/button';

const RoleResult = () => {
  const handleComplete = async () => {
    await getLastConnectRole();
  };

  return (
    <>
      <Button
        variant="primary"
        className="mt-4 w-[360px]"
        onClick={handleComplete}
      >
        확인
      </Button>
    </>
  );
};

export default RoleResult;
