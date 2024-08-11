import Button from '../atoms/button';
import IconButton from '../atoms/iconButton';

interface ProfileChangeFormProps {
  label: string;
  onClose: () => void;
  children: React.ReactNode;
}

const ProfileChangeForm = ({
  label,
  children,
  onClose,
}: ProfileChangeFormProps) => {
  return (
    <div className="flex w-[520px] flex-col items-center rounded-[14px] bg-white">
      {/* 나가기버튼 */}
      <div className="flex h-[72px] w-full justify-end p-[28px]">
        <IconButton onClick={onClose}>
          <div className="relative h-5 w-5">
            <div className="relative flex h-5 w-5 items-center justify-center bg-[url('/assets/icons/close.svg')] bg-center bg-no-repeat"></div>
          </div>
        </IconButton>
      </div>
      {/* 나가기버튼 */}
      <div className="h-[50px]">
        <p className="text-center text-xl">{label}</p>
      </div>
      <div className="h-[250px] px-[24px]">
        <div className="flex flex-col gap-[10px]">{children}</div>
      </div>
      <div className="h-[106px]">
        <Button variant="primary" className="mt-4 w-[360px]">
          완료
        </Button>
      </div>
    </div>
  );
};

export default ProfileChangeForm;
