import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';

interface AuthTimerProps {
  setExpire: Dispatch<SetStateAction<boolean>>;
}

const AuthTimer = memo(({ setExpire }: AuthTimerProps) => {
  //   const MINUTES_IN_MS = 1 * 60 * 1000; //초기값 10분
  const MINUTES_IN_MS = 1 * 3 * 1000;
  const INTERVAL = 1000; //1초
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0',
  );
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      clearInterval(timer);
      setExpire(true);
      console.log('타이머가 종료되었습니다.');
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, setExpire]);

  return (
    <div>
      {timeLeft <= 0 ? (
        <>
          <span className="text-base font-medium text-primary-400">
            유효 시간이 만료되었습니다. 인증 번호를 재요청해 주세요.
          </span>
        </>
      ) : (
        <>
          <span className="text-base font-medium text-gray-300">
            인증번호가 발송되었습니다. 유효시간&nbsp;
          </span>
          <span className="text-base font-medium text-primary-400">
            {minutes}:{second}
          </span>
        </>
      )}
    </div>
  );
});

export default AuthTimer;
