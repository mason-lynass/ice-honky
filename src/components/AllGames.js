import OneGame from "./OneGame"
import RecentGoal from "./RecentGoal"
import "../CSS/AllGames.css"
import { useState, useEffect } from "react"

function AllGames({ horns, logos }) {

    const [scores, setScores] = useState({})
    const [scoresLoaded, setScoresLoaded] = useState(false)
    const [recentGoalVisible, setRecentGoalVisible] = useState(false)
    const [teamWGoals, setTeamWGoals] = useState({})

    // initial fetch -- no buzzer sounds -- set up an object of all the current goals, so we know when to toot a horn
    let goalsObject = {}
    const sortTeams = []
    let sortedGoalsObject = {}
    useEffect(() => {

        fetch("https://nhl-score-api.herokuapp.com/api/scores/latest").then((r) => {
            if (r.ok) {
                r.json().then((scores) => {
                    setScores(scores)
                    setScoresLoaded(true)

                    scores.games.map((game) => {
                        // create goals object to check if there are new goals 
                        sortTeams.push(Object.keys(game.scores)[0])
                        sortTeams.push(Object.keys(game.scores)[1])
                        sortTeams.sort()

                        goalsObject[Object.keys(game.scores)[0]] = Object.values(game.scores)[0]
                        goalsObject[Object.keys(game.scores)[1]] = Object.values(game.scores)[1]
                    })

                    sortTeams.map((team) => {
                        sortedGoalsObject[team] = goalsObject[team]
                    })

                    console.log('initial fetch!')
                })
            }
        })
    }, [])

    // suppositional fetches, do with buzzers
    let timeout1
    let timeout2
    useEffect(() => {
        const date = new Date()
        if (date.getUTCHours() <= 8 || date.getUTCHours() >= 17) {
            timeout2 = setTimeout(() => {
                refresh()
            }, 30 * 1000)
            return () => {
                clearTimeout(timeout1)
                clearTimeout(timeout2)
            }
        }
    }, [])

    // to show the team that just scored in a big box,
    // close that big box, and blur behind the box

    const behind = document.querySelector("body")
    function handleCloseRG() {
        behind.classList.remove("behindBlur")
        setRecentGoalVisible(false)
    }
    function showRecentGoal() {
        behind.classList.add("behindBlur")
        setRecentGoalVisible(true)
    }

    function refresh() {
        fetch("https://nhl-score-api.herokuapp.com/api/scores/latest").then((r) => {
            if (r.ok) {
                r.json().then((scores) => {

                    setScores(scores)
                    console.log("additional fetch!")

                    let updateObject = {}
                    let sorted = []
                    let sortedUpdateObject = {}
                    //create updateObject to compare to the goalsObject. if a team has a different score, toot their horn
                    scores.games.map((game) => {
                        sorted.push(Object.keys(game.scores)[0])
                        sorted.push(Object.keys(game.scores)[1])
                        sorted.sort()

                        // away
                        updateObject[Object.keys(game.scores)[0]] = Object.values(game.scores)[0]
                        // home
                        updateObject[Object.keys(game.scores)[1]] = Object.values(game.scores)[1]
                    })

                    sorted.map((team) => {
                        sortedUpdateObject[team] = updateObject[team]
                    })

                    let teamIdx = 0
                    while (teamIdx < Object.keys(sortedUpdateObject).length) {
                        // if the new goals object (updateObject) does not equal the goalsObject that means somebody scored, and we need to toot a horn
                        if (Object.values(sortedUpdateObject)[teamIdx] !== Object.values(sortedGoalsObject)[teamIdx]) {

                            console.log(Object.keys(sortedUpdateObject)[teamIdx], "scored goal number: ", Object.values(sortedUpdateObject)[teamIdx], "@", Date.now())

                            sortedGoalsObject = sortedUpdateObject

                            soundTeamHorn(Object.keys(sortedUpdateObject)[teamIdx])
                            setTeamWGoals(Object.entries(sortedUpdateObject)[teamIdx])
                            showRecentGoal()
                            // break the while loop so we don't sound 2 horns at the same time
                            break

                        } else {
                            // get rid of all of this in this condition once i can show Alex that this works
                            console.log(Object.entries(sortedUpdateObject)[teamIdx])

                            setRecentGoalVisible(true)
                            setTeamWGoals(Object.entries(sortedUpdateObject)[teamIdx])
                            showRecentGoal()
                            // console.log(Object.keys(sortedUpdateObject)[teamIdx], "didn't score since last check")
                        }
                        teamIdx = teamIdx + 1
                    }
                })
            }
        })
        // how often do you want the site to request scores from the API?
        timeout1 = setTimeout(refresh, 30 * 1000)
    }

    function AllTheGames() {
        return (
            scores.games.map((game) => {
                return (
                    <OneGame key={game.teams.home.abbreviation} horns={horns} game={game} logos={logos} />
                )
            })
        )
    }

    function handleSoundClick() {
        if (document.querySelector(`.activeSoundButton`)) {
            const sound = document.getElementById(`soundButton`)
            sound.classList.remove('activeSoundButton')
        } else if (document.getElementById(`soundButton`)) {
            const sound = document.getElementById(`soundButton`)
            sound.classList.add('activeSoundButton')
        }
    }

    function soundButton() {
        return (
            <button id='soundButton' onClick={handleSoundClick}>sound on</button>
        )
    }

    function soundTeamHorn(abb) {
        const teamHornArray = Object.entries(horns).filter((horn) => horn[0] === abb)
        return new Audio(teamHornArray[0][1]).play()
    }


    return (
        <main>
            <div id="AllGames">
                {(scoresLoaded === true) ?
                    <div>
                        {(recentGoalVisible === true ?
                            <RecentGoal
                                logos={logos}
                                teamWGoals={teamWGoals}
                                scores={scores}
                                handleCloseRG={handleCloseRG}
                            /> : "")}

                        {soundButton()}
                        {AllTheGames()}
                    </div>

                    :
                    <h2>loading...</h2>}
            </div>
        </main>
    )
}

export default AllGames