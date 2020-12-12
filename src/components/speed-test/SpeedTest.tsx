import React, { useEffect, useRef, useState, KeyboardEvent, ChangeEvent } from 'react';
import { Timer, TimerRef } from '../timer/Timer';
import { englishText } from './words';
import { TextViewer } from '../text-viewer/TextViewer';

import './SpeedTest.scss';

const LETTERS_PER_WORD = 4;

export default function SpeedTest() {
  const timerRef = useRef<TimerRef>();
  const [input, setInput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [inputStack, setInputStack] = useState<string[]>([]);
  const [keystrokes, setKeystrokes] = useState<number>(0);
  const [corrections, setCorrections] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [wpm, setWpm] = useState<number>();
  //const [accuracy, setAccuracy] = useState<number>();
  const words = englishText.replace(/\n/g, '').split(' ');

  useEffect(() => {
    if (input.length > 0 && !isRunning) {
      setIsRunning(true);
    }
  }, [input, isRunning]);

  function reset() {
    setInput('');
    setInputStack([]);
    setIsDisabled(false);
    setIsRunning(false);
    if (timerRef && timerRef.current) timerRef.current.reset();
  }

  function handleTimeOver() {
    const accuracy = (keystrokes - mistakes) / (keystrokes + corrections);
    console.log(accuracy);
    console.log(keystrokes, mistakes, accuracy);
    console.log(Math.ceil((keystrokes - mistakes) * accuracy / LETTERS_PER_WORD ));
    setWpm(Math.ceil((keystrokes - mistakes) * accuracy / LETTERS_PER_WORD ));
    setIsDisabled(true);
  }

  function calculateStrokes(e: KeyboardEvent<HTMLInputElement>) {
    if (e.shiftKey) setKeystrokes(keystrokes + 2);
    else setKeystrokes(keystrokes + 1)
  }

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    switch (e.keyCode) {
      // Escape restarts
      case 27:
        reset();
        return;
      // Backspace
      case 8:
        if (inputStack.length > 0 && !input.length) {
          e.preventDefault();
          const lastIndex = inputStack.length - 1;
          setInput(inputStack[lastIndex]);
          setInputStack(inputStack.slice(0, lastIndex))
        }
        setCorrections(corrections+1);
        return;
      // Space hit
      case 32:
        e.preventDefault();
        setInputStack([...inputStack, input]);
        setInput('');
        break;
    }

    calculateStrokes(e);
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (!words[inputStack.length].includes(value.trim())) {
      setMistakes(mistakes + 1);
    }

    setInput(value);
  }

  return (
    <div className="speed-test">
      <TextViewer
        words={words}
        inputStack={inputStack}
        activeInput={input}
      />
      <div className="speed-test__input-bar">
        <input
          data-testid="input-field"
          type="text"
          disabled={isDisabled}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyPress}
          autoFocus
        />
        <Timer
          ref={timerRef}
          initTime={60 * 1}
          isRunning={isRunning}
          onTimeOver={handleTimeOver}
        />
      </div>
      {isDisabled && <div>
        Your word count is {wpm}!
      </div>}
    </div>
  )
}
