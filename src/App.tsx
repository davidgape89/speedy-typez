import React from 'react';
import SpeedTest from './components/speed-test/SpeedTest';
import Header from './components/header/Header';
import Keyboard from './components/keyboard/Keyboard';
import KeyboardMapper, { KeyMap } from './components/key-mapper/KeyMapper';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Header />
      <SpeedTest />
      <KeyboardMapper>
        {(keys: KeyMap) => (
          <Keyboard keys={keys} />
        )}
      </KeyboardMapper>
    </div>
  );
}

export default App;
