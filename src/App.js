import React from 'react';
import './App.css';
import Provider from './context/starProvider';
import StarWarsInfos from './page/StarWarsInfos';

function App() {
  return (
    <Provider>
      <span>Hello App!</span>
      <StarWarsInfos />
    </Provider>
  );
}

export default App;
