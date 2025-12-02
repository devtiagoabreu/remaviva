import { useState, useEffect } from 'react';
import { CountdownTime } from '@/types';

export const useCountdown = (initialTime: CountdownTime) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(initialTime);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        
        // Quando chegar a zero, para o timer
        setIsActive(false);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  const reset = () => {
    setTimeLeft(initialTime);
    setIsActive(true);
  };

  const pause = () => setIsActive(false);
  const resume = () => setIsActive(true);

  return {
    timeLeft,
    isActive,
    reset,
    pause,
    resume,
    formatted: {
      hours: String(timeLeft.hours).padStart(2, '0'),
      minutes: String(timeLeft.minutes).padStart(2, '0'),
      seconds: String(timeLeft.seconds).padStart(2, '0')
    }
  };
};