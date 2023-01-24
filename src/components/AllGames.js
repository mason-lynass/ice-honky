import OneGame from "./OneGame"
import { useState, useEffect } from "react"

function AllGames({horns}) {

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

    function AllTheGames() {
        return (
            scores.games.map((game) => {
                console.log(game)
                return (
                    <OneGame horns={horns} game={game} />
                )
            })
        )
        
    }

    return (
        (scoresLoaded === true ) ?
        AllTheGames() : <h2>loading...</h2>
    )
}

export default AllGames