import OneGame from "./OneGame"
import { useState, useEffect } from "react"


function AllGames({ horns, logos, setCurrentPage }) {

    const [scores, setScores] = useState({})
    const [scoresLoaded, setScoresLoaded] = useState(false)

    setCurrentPage("home")

    let goalsObject = {}

    // intial fetch -- no buzzer sounds
    useEffect(() => {
        fetch("https://nhl-score-api.herokuapp.com/api/scores/latest").then((r) => {
            if (r.ok) {
                r.json().then((scores) => {
                    setScores(scores)
                    setScoresLoaded(true)

                    scores.games.map((game) => {
                        
                        goalsObject[Object.keys(game.scores)[0]] = Object.values(game.scores)[0]
                        goalsObject[Object.keys(game.scores)[1]] = Object.values(game.scores)[1]
                    })
                    console.log(goalsObject)
                    
                    console.log('initial fetch!')
                })
            }
        })
    }, [])

    // suppositional fetches, do with buzzers
    useEffect(() => {
        setTimeout(() => {
            refresh()
        }, 5 * 1000)
    }, [])

    function refresh() {
        fetch("https://nhl-score-api.herokuapp.com/api/scores/latest").then((r) => {
            if (r.ok) {
                r.json().then((scores) => {

                    setScores(scores)            
                    console.log("additional fetch!")

                    let updateObject = {}

                    scores.games.map((game) => {                      
                        updateObject[Object.keys(game.scores)[0]] = Object.values(game.scores)[0]
                        updateObject[Object.keys(game.scores)[1]] = Object.values(game.scores)[1]
                    })

                    let count = 0

                    while (count < Object.keys(updateObject).length) {
                        if (Object.values(updateObject)[count] !== Object.values(goalsObject)[count]) {
                            console.log(Object.keys(updateObject)[count], "scored goal number: ", Object.values(updateObject)[count], "@", Date.now())
                            goalsObject = updateObject
                        } else {
                            console.log("nobody scored")
                        }

                        count = count + 1
                    }

                    // console.log(Object.keys(updateObject).length)
                    // console.log(goalsObject)
                    
                })
            }
        })
        setTimeout(refresh, 60 * 1000)
    }

    function AllTheGames() {
        return (
            scores.games.map((game) => {
                // console.log(game)
                return (
                    <OneGame horns={horns} game={game} logos={logos} />
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