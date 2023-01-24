import './App.css';
// import OneGame from './components/OneGame';
import AllGames from './components/AllGames';
// import { useState, useEffect } from "react"

function App() {

  // this is like an import up there ^^, just importing the whole folder of mp3 horns 
  function importHorns(r) {
    let horns = {};
    r.keys().forEach((item, index) => { horns[item.replace('./', '').replace('.mp3', '')] = r(item) })
    return horns
  }
  const horns = importHorns(require.context('./audio/mp3s', false, /\.mp3$/))

  return (
    <div className="App">
      <header>
        <h1>Ice Honky</h1>
      </header>
      <div>
        <AllGames horns={horns}/>
        <h2>hello</h2>
      </div>
    </div>
  );
}

export default App;
