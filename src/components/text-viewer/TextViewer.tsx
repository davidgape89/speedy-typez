import React, { useEffect } from 'react';
import './TextViewer.scss';

export interface TextViewerProps {
  words: string[];
  inputStack: string[];
  activeInput: string;
}

export function TextViewer(props: TextViewerProps) {
  const {
    words,
    inputStack,
    activeInput
  } = props;

  useEffect(() => {
    const activeEl: HTMLElement | null = document.querySelector('.is-active');
    if(activeEl) activeEl.scrollIntoView();
  }, [inputStack]);

  function getWordStatus(i: number) {
    if (inputStack[i]) {
      if(words[i] === inputStack[i]) return "is-valid";
      else return "is-invalid";
    } else if (inputStack.length === i) {
      if(words[i].startsWith(activeInput)) return "is-active";
      else return "is-invalid";
    }
  }

  return (
    <div className="text-viewer">
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
  );
}
