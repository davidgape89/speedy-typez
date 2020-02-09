import React, { useEffect, useRef } from 'react';
import {Timer, TimerRef} from '../timer/Timer';
import {englishText} from './words';
import './SpeedTest.scss';

const SpeedTest = () => {
  const [input, setInput] = React.useState<string>('');
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);
  const [inputStack, setInputStack] = React.useState<string[]>([]);
  const timerRef = useRef<TimerRef>();
  const words = englishText.replace(/\n/g, '').split(' ');

  useEffect(() => {
    if(input.length > 0) {
      setIsRunning(true);
    }
  }, [input]);

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
      case 32:
        e.preventDefault();
        setInputStack([...inputStack, input]);
        setInput('');
        break;
      case 8:
        if(inputStack.length > 0 && !input.length) {
          e.preventDefault();
          const lastIndex = inputStack.length - 1;
          setInput(inputStack[lastIndex]);
          setInputStack(inputStack.slice(0, lastIndex))
        }
        break;
      case 27:
        reset();
        break;
    }
  }

  function getWordStatus(i: number) {
    if (inputStack[i]) {
      if(words[i] === inputStack[i]) return "is-valid";
      else return "is-invalid";
    } else if (inputStack.length === i) {
      if(words[i].startsWith(input)) return "is-active";
      else return "is-invalid";
    }
  }

  return (
    <div className="speed-test">
      <div className="speed-test__text">
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <span
              className={getWordStatus(i)}>
              {word}
            </span>
            <span>{' '}</span>
          </React.Fragment>
        ))}
      </div>
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
