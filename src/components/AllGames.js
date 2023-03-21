import OneGame from "./OneGame"
import RecentGoal from "./RecentGoal"
import "../CSS/AllGames.css"
import { useState, useEffect, useRef } from "react"
import puckSound from "../audio/mp3s/a.pucksound.mp3"
import useSound from "use-sound"

function AllGames({ horns, logos, volume, setVolume }) {

    const [puck] = useSound(puckSound)

    const [scores, setScores] = useState({})
    const [scoresLoaded, setScoresLoaded] = useState(false)
    const [recentGoalVisible, setRecentGoalVisible] = useState(false)
    const [teamWGoals, setTeamWGoals] = useState({})
    const [doubleGoalSameTeam, setDoubleGoalSameTeam] = useState(false)

    const volumeRef = useRef(volume)
    volumeRef.current = volume

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

                    scores.games.forEach((game) => {
                        // create goals object to check if there are new goals 
                        sortTeams.push(Object.keys(game.scores)[0])
                        sortTeams.push(Object.keys(game.scores)[1])
                        sortTeams.sort()

                        goalsObject[Object.keys(game.scores)[0]] = Object.values(game.scores)[0]
                        goalsObject[Object.keys(game.scores)[1]] = Object.values(game.scores)[1]
                    })

                    sortTeams.forEach((team) => {
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
        // only do the refresh during hours when games are expected to be happening
        if (date.getUTCHours() <= 8 || date.getUTCHours() >= 17) {
            timeout2 = setTimeout(() => {
                refresh()
            }, 3 * 1000)
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

    useEffect(() => {
        behind.addEventListener('click', handleCloseRG)
        return () => {
            behind.removeEventListener('click', handleCloseRG)
        }
    })

    function refresh() {
        fetch("https://nhl-score-api.herokuapp.com/api/scores/latest").then((r) => {
            if (r.ok) {
                r.json().then((scores) => {

                    // you can use this one to test multiple goals
                    // let freshGoalsArray = [['TOR', 5], ['TOR', 4]]
                    let freshGoalsArray = []
                    setScores(scores)
                    console.log("additional fetch!")

                    let updateObject = {}
                    let sorted = []
                    let sortedUpdateObject = {}
                    //create updateObject to compare to the goalsObject. if a team has a different score, toot their horn
                    scores.games.forEach((game) => {
                        sorted.push(Object.keys(game.scores)[0])
                        sorted.push(Object.keys(game.scores)[1])
                        sorted.sort()

                        // away
                        updateObject[Object.keys(game.scores)[0]] = Object.values(game.scores)[0]
                        // home
                        updateObject[Object.keys(game.scores)[1]] = Object.values(game.scores)[1]
                    })

                    sorted.forEach((team) => {
                        sortedUpdateObject[team] = updateObject[team]
                    })

                    // console.log(sortedGoalsObject, sortedUpdateObject)

                    let teamIdx = 0
                    while (teamIdx < Object.keys(sortedUpdateObject).length) {
                        // if the new goals object (updateObject) does not equal the goalsObject that means somebody scored, and we need to toot a horn
                        const team = Object.keys(sortedUpdateObject)[teamIdx]
                        const oldScore = Object.values(sortedGoalsObject)[teamIdx]
                        const newScore = Object.values(sortedUpdateObject)[teamIdx]

                        // console.log(team, oldScore, newScore)

                        if (newScore !== oldScore) {
                            for (let i = oldScore + 1; i <= newScore; i++) {
                                console.log(team, "scored goal number: ", i, "@", Date.now())
                                freshGoalsArray.push([team, i])
                            }

                        } else {
                            setRecentGoalVisible(false)
                            behind.classList.remove("behindBlur")
                            console.log(team, "didn't score since last check")
                        }
                        teamIdx = teamIdx + 1
                    }
                    sortedGoalsObject = sortedUpdateObject

                    // check if same team is in freshGoalsArray more than once, setDoubleGoalSameTeam to true. if it's true, RecentGoal.js has a function where it will display the second most recent goal. doubleGoalSameTeam will get set to false within the extraGoalsTimer

                    const sameTeam = {}
                    freshGoalsArray.forEach((goal) => {
                        if (!sameTeam[goal[0]]) {
                            sameTeam[goal[0]] = 1
                        } else setDoubleGoalSameTeam(true)
                    })
                    // this will happen every time someone scores, and start immediately
                    if (freshGoalsArray.length > 0) {

                        soundTeamHorn(freshGoalsArray[0][0])
                        // soundTeamHorn(freshGoalsArray[0][0])
                        setTeamWGoals(freshGoalsArray[0])
                        showRecentGoal()

                    }
                    // if there are multiple goals in the same refresh:
                    if (freshGoalsArray.length > 1) {
                        // a new array of goals without the first goal (we took care of that in the earlier "if")
                        const extraGoals = [...freshGoalsArray].slice(1)
                        let goalNumber = 0
                        // for each goal in the extraGoals array, sound the horn and show the goal
                        // after the first goal is shown and heard
                        let extraGoalsTimer = setInterval(() => {
                            setDoubleGoalSameTeam(false)
                            setRecentGoalVisible(true)
                            soundTeamHorn(extraGoals[goalNumber][0])
                            setTeamWGoals(extraGoals[goalNumber])
                            goalNumber++
                            // if length = 2, 15 seconds after first horn,
                            // if length = 3, 10 second intervals, etc.
                        }, (30 / freshGoalsArray.length) * 1000)
                        setTimeout(() => { clearInterval(extraGoalsTimer) }, 29000)
                    }
                })
            }
        })
        // how often do you want the site to request scores from the API?
        timeout1 = setTimeout(refresh, 30 * 1000)
    }

    function AllTheGames() {
        const gamesOrdered = []
        const activeGames = scores.games.filter((game) => game.status.state === "LIVE")
        activeGames.forEach((game) => gamesOrdered.push(game))
        const nonActiveGames = scores.games.filter((game) => game.status.state !== "LIVE")
        nonActiveGames.forEach((game) => gamesOrdered.push(game))
        return (
            (scores.games.length > 0) ?
                gamesOrdered.map((game) => {
                    return (
                        <OneGame key={game.teams.home.abbreviation} horns={horns} game={game} logos={logos} />
                    )
                })
                :
                <div>
                    <h2>no game data right now</h2>
                    <h3>this usually happens right before the first game of the day starts</h3>
                    <h4>check back in a minute</h4>
                </div>
        )
    }

    // function handleSoundClick() {
    //     if (volume) {
    //         const sound = document.getElementById(`soundButton`)
    //         sound.classList.remove('activeSoundButton')
    //         setVolume(false)
    //     } else {
    //         const sound = document.getElementById(`soundButton`)
    //         sound.classList.add('activeSoundButton')
    //         setVolume(true)
    //     }
    // }

    // function soundButton() {
    //     return (
    //         <button id='soundButton' onClick={handleSoundClick}>
    //             {(volume === true) ? "sound on" : "sound off"}
    //         </button>
    //     )
    // }

    const [activeHorn, setActiveHorn] = useState()
    let hornPlaying

    function handleSoundClick() {
        if (!volume) {
            puck()
        }
        if (volume && activeHorn) {
            hornPlaying = activeHorn
            hornPlaying.pause()
        }
        setVolume(!volume)
    }

    function soundButton() {
        return (
            <button id='soundButton' onClick={handleSoundClick}>
                {volume ? <span>🔊</span> : <span>🔇</span>}
                <br></br>
                <span>Sound on/off</span>
            </button>
        )
    }

    function soundTeamHorn(abb) {
        if (volumeRef.current) {
            const teamHornArray = Object.entries(horns).filter((horn) => horn[0] === abb)
            hornPlaying = new Audio(teamHornArray[0][1])
            setActiveHorn(hornPlaying)
            return hornPlaying.play()
        }
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
                                doubleGoalSameTeam={doubleGoalSameTeam}
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