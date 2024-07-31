const AccountInfo = () => {
  return (
    <div className="flex h-[236px] w-[1084px] flex-col items-center justify-center gap-[24px] border">
      <div className="flex h-[40px] w-[1012px] items-center">
        <p className="h-[24px] w-[1020px] text-base">계정정보</p>
      </div>
      <div className="h-[108px] w-[1012px]">
        <div className="flex h-[24px] w-[1020px] flex-row gap-[16px] text-base">
          <div className="h-[108px] w-[326.67px]">
            <p className="flex h-[40px] w-[348px] items-center">이메일</p>
            <div className="h-[60px] w-[332px] rounded-[12px] border-2"></div>
          </div>
          <div className="h-[108px] w-[326.67px]">
            <p className="flex h-[40px] w-[348px] items-center">비밀번호</p>
            <div className="h-[60px] w-[332px] rounded-[12px] border-2"></div>
          </div>
          <div className="h-[108px] w-[326.67px]">
            <p className="flex h-[40px] w-[348px] items-center">휴대폰번호</p>
            <div className="h-[60px] w-[332px] rounded-[12px] border-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
