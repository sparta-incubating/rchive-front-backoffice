const TapMenu = () => {
  return (
    <section className="h-[64px] w-full border-b-2">
      <div className="flex gap-[6px] pt-[16px]">
        <div className="h-[48px] w-[104px] border">전체</div>
        <div className="h-[48px] w-[119px] border">대기중</div>
        <div className="h-[48px] w-[104px] border">승인</div>
      </div>
    </section>
  );
};

export default TapMenu;
