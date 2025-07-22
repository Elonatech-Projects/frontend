import { useState, useEffect } from 'react';
import TimeBlock from './TimeBlock';

type CountdownTimerProps = {
  targetDate: Date;
  onComplete?: () => void;
};

export default function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  function getTimeLeft(target: Date) {
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const tl = getTimeLeft(targetDate);
      setTimeLeft(tl);
      if (!tl && onComplete) onComplete();
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (!timeLeft) return null;

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-wrap justify-center gap-6 mb-12">
      <TimeBlock label="Days" value={timeLeft.days} />
      <TimeBlock label="Hours" value={timeLeft.hours} />
      <TimeBlock label="Minutes" value={timeLeft.minutes} />
      <TimeBlock label="Seconds" value={timeLeft.seconds} />
    </div>
  );
}
