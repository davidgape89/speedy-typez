import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

export enum TimerDirection {
  ASC = 1,
  DESC = -1,
}

interface TimerProps {
  initTime: number;
  onTimeOver: () => void;
  isRunning?: boolean;
  direction?: TimerDirection;
}

export interface TimerRef {
  reset: () => void;
}

export const Timer = forwardRef(({
    isRunning = true,
    initTime,
    direction = TimerDirection.DESC,
    onTimeOver
  }: TimerProps, ref) => {
  const [time, setTime] = useState(initTime);
  const [timeoutRef, setTimeoutRef] = useState();
  const minutes = Math.floor(time / 60).toString();
  const seconds = (time % 60).toString();

  if ( isRunning && !timeoutRef) {
    if (time === 0) {
      onTimeOver();
    } else {
      setTimeoutRef(
        setTimeout(() => {
          setTime(time => time + direction)
          setTimeoutRef(null);
        }, 1000)
      );
    }
  }

  useImperativeHandle(ref, () => ({
    reset() {
      setTime(initTime);
    }
  }));

  useEffect(() => {
    if (!isRunning && timeoutRef) {
      clearTimeout(timeoutRef);
      setTimeoutRef(null);
    }

    return () => clearTimeout(timeoutRef);
  }, [isRunning, timeoutRef]);

  return (
    <span>
      {minutes.length === 1 ? `0${minutes}`: minutes}:
      {seconds.length === 1 ? `0${seconds}`: seconds}
    </span>
  )
});
