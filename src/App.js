import './CSS/App.css';
// import OneGame from './components/OneGame';
import AllGames from './components/AllGames';
// import { useState, useEffect } from "react"
import NavBar from './components/NavBar'
import { Route, Routes } from "react-router-dom"
import AllHorns from "./components/AllHorns"
import { useState } from "react"
import DateCheck from './components/DateCheck';
import About from './components/About'

function App() {

  // this is like an import up there ^^, just importing the whole folder of mp3 horns 
  const [currentPage, setCurrentPage] = useState("")

  function importHorns(r) {
    let horns = {};
    r.keys().forEach((item, index) => { horns[item.replace('./', '').replace('.mp3', '')] = r(item) })
    return horns
  }
  const horns = importHorns(require.context('./audio/mp3s', false, /\.mp3$/))

  function importAll(r) {
    let logos = {};
    r.keys().forEach((item, index) => { logos[item.replace('./', '').replace('.svg', '')] = r(item) })
    return logos
  }
  const logos = importAll(require.context('./logos', false, /\.svg$/))

  return (
    <div className="App">
      <NavBar setCurrentPage={setCurrentPage} currentPage={currentPage}></NavBar>
      <header>
        <h1 id='title'>📢IceHonky.Net</h1>
      </header>
      <Routes>
        <Route
          element={<DateCheck setCurrentPage={setCurrentPage} logos={logos} horns={horns} />}
          path="/"
        >
        </Route>
        <Route
          element={<AllHorns
            setCurrentPage={setCurrentPage}
            logos={logos}
            horns={horns}
          />}
          path="/horns"
        >
        </Route>
        <Route
          element={<About setCurrentPage={setCurrentPage}></About>}
          path="/about"
        >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
