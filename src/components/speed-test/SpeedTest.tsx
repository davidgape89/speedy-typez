import React, { useEffect, useRef, useState } from 'react';
import {Timer, TimerRef} from '../timer/Timer';
import {englishText} from './words';
import './SpeedTest.scss';
import { TextViewer } from '../text-viewer/TextViewer';

const SpeedTest = () => {
  const timerRef = useRef<TimerRef>();
  const [input, setInput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [inputStack, setInputStack] = useState<string[]>([]);
  const words = englishText.replace(/\n/g, '').split(' ');

  useEffect(() => {
    if(input.length > 0 && !isRunning) {
      setIsRunning(true);
    }
  }, [input, isRunning]);

  function reset() {
    setInput('');
    setInputStack([]);
    setIsDisabled(false);
    setIsRunning(false);
    if(timerRef && timerRef.current) timerRef.current.reset();
  }

  function handleTimeOver() {
    setIsDisabled(true);
  }

  function handleTicker() {
    setIsRunning(!isRunning);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    switch(e.keyCode){
      // Space hit
      case 32:
        e.preventDefault();
        setInputStack([...inputStack, input]);
        setInput('');
        break;
      // Backspace
      case 8:
        if(inputStack.length > 0 && !input.length) {
          e.preventDefault();
          const lastIndex = inputStack.length - 1;
          setInput(inputStack[lastIndex]);
          setInputStack(inputStack.slice(0, lastIndex))
        }
        break;
      // Escape restarts
      case 27:
        reset();
        break;
    }
  }

  return (
    <div className="speed-test">
      <TextViewer
        words={words}
        inputStack={inputStack}
        activeInput={input}
      />
      <input
        type="text"
        className="speed-test__input"
        disabled={isDisabled}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Timer
        ref={timerRef}
        initTime={60 * 1}
        isRunning={isRunning}
        onTimeOver={handleTimeOver}
      />
      <button onClick={handleTicker}>Start/stop</button>
      {isDisabled && <div>
        Your word count is {inputStack.length / 2}!
      </div>}
    </div>
  )
}

export default SpeedTest;
