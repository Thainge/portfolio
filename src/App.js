import React from 'react';
import { InputProvider } from './Context/ContextProvider';
import RouterComponent from './Components/Router';
import './App.css';

function App() {
  return (
    <>
      <InputProvider>
        <RouterComponent />
      </InputProvider>
    </>
  );
}

export default App;