import React from 'react';
import SpeedTest from './components/speed-test/SpeedTest';
import Header from './components/header/Header';
import Keyboard from './components/keyboard/Keyboard';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Header />
      <SpeedTest />
      <Keyboard />
    </div>
  );
}

export default App;
