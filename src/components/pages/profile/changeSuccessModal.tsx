import Button from '@/components/atoms/button';
import IconButton from '@/components/atoms/iconButton';

interface ChangeSuccessModalProps {
  label: string;
  onClose: () => void;
}

const ChangeSuccessModal = ({ onClose, label }: ChangeSuccessModalProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-60"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex h-[527px] w-[520px] flex-col items-center rounded-[12px] bg-white">
          <div className="flex h-[72px] w-full justify-end p-[28px]">
            <IconButton onClick={onClose}>
              <div className="relative h-5 w-5">
                <div className="relative flex h-5 w-5 items-center justify-center bg-[url('/assets/icons/close.svg')] bg-center bg-no-repeat"></div>
              </div>
            </IconButton>
          </div>
          <div className="flex h-[500px] w-[520px] flex-col items-center justify-center gap-[32px]">
            <div className="h-[38px]">
              <p className="text-center text-xl font-medium">
                {label}이 완료되었습니다.
              </p>
            </div>
            <div className="h-[104px]">
              <Button
                variant="primary"
                className="mt-4 w-[360px]"
                onClick={onClose}
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeSuccessModal;
