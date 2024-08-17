import Button from '../atoms/button';
import IconButton from '../atoms/iconButton';

interface ProfileChangeFormProps {
  label: string;
  onClose: () => void;
  children: React.ReactNode;
  isValid: boolean;
}

const ProfileChangeForm = ({
  label,
  children,
  onClose,
  isValid,
}: ProfileChangeFormProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-60"></div>
      <div className="fixed inset-0 flex items-center justify-center border">
        <div className="flex h-[557px] w-[520px] flex-col items-center rounded-[14px] border bg-white">
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
            <Button
              variant="primary"
              className="mt-4 w-[360px]"
              disabled={!isValid}
              type="submit"
            >
              완료
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileChangeForm;
