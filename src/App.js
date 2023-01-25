import './CSS/App.css';
// import OneGame from './components/OneGame';
import AllGames from './components/AllGames';
// import { useState, useEffect } from "react"
import NavBar from './components/NavBar'
import { Route, Routes } from "react-router-dom"

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
      <NavBar></NavBar>
      <Routes>
        <Route
        element={<AllGames horns={horns}/>}
        path="/"
        >
          {/* <header>
            <h1>Ice Honky</h1>
          </header>
          <div id="AllGames">
            <AllGames horns={horns} />
          </div> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
