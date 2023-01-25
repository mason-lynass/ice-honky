import OneGame from "./OneGame"
import { useState, useEffect } from "react"

function AllGames({ horns }) {

    const [scores, setScores] = useState({})
    const [scoresLoaded, setScoresLoaded] = useState(false)

    useEffect(() => {
        fetch("https://nhl-score-api.herokuapp.com/api/scores/latest").then((r) => {
            if (r.ok) {
                r.json().then((scores) => {
                    setScores(scores)
                    setScoresLoaded(true)
                })
            }
        })
    }, [])

    // this is like an import up there ^^, just importing the whole folder of logos 
  function importAll(r) {
    let logos = {};
    r.keys().forEach((item, index) => { logos[item.replace('./', '').replace('.svg', '')] = r(item) })
    return logos
  }
  const logos = importAll(require.context('../logos', false, /\.svg$/))

    function AllTheGames() {
        return (
            scores.games.map((game) => {
                // console.log(game)
                return (
                    <OneGame horns={horns} game={game} logos={logos}/>
                )
            })
        )

    }

    return (
        <>
            <header>
                <h1>Ice Honky</h1>
            </header>
            <div id="AllGames">
                {(scoresLoaded === true) ?
                    AllTheGames() : <h2>loading...</h2>}
            </div>
        </>
    )
}

export default AllGames