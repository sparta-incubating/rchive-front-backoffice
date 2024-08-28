import Button from '../atoms/button';
import IconButton from '../atoms/iconButton';

interface LabelPros {
  main: string;
  sub: string;
}

interface ProfileChangeFormProps {
  labels: LabelPros;
  onClose: () => void;
  children: React.ReactNode;
  isValid: boolean;
}

const ProfileChangeForm = ({
  labels,
  children,
  onClose,
  isValid,
}: ProfileChangeFormProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-60"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex h-[557px] w-[520px] flex-col items-center rounded-[12px] border bg-white">
          {/* 나가기버튼 */}
          <div className="flex h-[72px] w-full justify-end p-[28px]">
            <IconButton onClick={onClose}>
              <div className="relative h-5 w-5">
                <div className="relative flex h-5 w-5 items-center justify-center bg-[url('/assets/icons/close.svg')] bg-center bg-no-repeat"></div>
              </div>
            </IconButton>
          </div>
          {/* 나가기버튼 */}
          <div className="flex flex-col">
            <div className="flex flex-col gap-[8px]">
              <p className="h-[30px] text-center text-xl font-semibold text-gray-900">
                {labels.main}
              </p>
              {labels.sub && (
                <p className="mb-[20px] h-[44px] text-center text-base font-medium text-gray-600">
                  {labels.sub}
                </p>
              )}
            </div>
            <div className="my-[32px] flex justify-center px-[24px]">
              <div className="flex flex-col gap-[10px]">{children}</div>
            </div>
            <div className="w-full px-[80px] pb-[40px]">
              <Button
                variant="primary"
                className="w-[360px]"
                disabled={!isValid}
                type="submit"
              >
                완료
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileChangeForm;
