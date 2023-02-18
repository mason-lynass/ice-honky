import OneGame from "./OneGame"
import RecentGoal from "./RecentGoal"
import "../CSS/AllGames.css"
import { useState, useEffect } from "react"

function AllGames({ horns, logos }) {

    const [scores, setScores] = useState({})
    const [scoresLoaded, setScoresLoaded] = useState(false)
    const [recentGoalVisible, setRecentGoalVisible] = useState(false)
    const [volume, setVolume] = useState(false)
    const [teamWGoals, setTeamWGoals] = useState({})
    const [doubleGoalSameTeam, setDoubleGoalSameTeam] = useState(false)

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

    // you can use this one to test multiple goals
    // let freshGoalsArray = [['TOR', 5], ['TOR', 4]]
    let freshGoalsArray = []

    function refresh() {
        fetch("https://nhl-score-api.herokuapp.com/api/scores/latest").then((r) => {
            if (r.ok) {
                r.json().then((scores) => {

                    freshGoalsArray = [['COL', 4]]
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

                    let teamIdx = 0
                    while (teamIdx < Object.keys(sortedUpdateObject).length) {
                        // if the new goals object (updateObject) does not equal the goalsObject that means somebody scored, and we need to toot a horn
                        if (Object.values(sortedUpdateObject)[teamIdx] !== Object.values(sortedGoalsObject)[teamIdx]) {

                            console.log(Object.keys(sortedUpdateObject)[teamIdx], "scored goal number: ", Object.values(sortedUpdateObject)[teamIdx], "@", Date.now())
                            sortedGoalsObject = sortedUpdateObject
                            freshGoalsArray.push(Object.entries(sortedGoalsObject)[teamIdx])

                        } else {
                            setRecentGoalVisible(false)
                            behind.classList.remove("behindBlur")
                            console.log(Object.keys(sortedUpdateObject)[teamIdx], "didn't score since last check")
                        }
                        teamIdx = teamIdx + 1
                    }
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
                        const extraGoals = [...freshGoalsArray].splice(0, 1)
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
                    // this does not yet work when 2 or more goals are scored by the same team
                    // (which will be very rare, but could happen!)
                    // because we're showing the recentGoal by filtering "scores" -
                    // finding the game by comparing game teams to sortedUpdateObject[teamIdx],
                    // then displaying the last goal in the array of goals.
                    // in this case, I'm pretty sure it will display the last goal 2 (or more) times
                })
            }
        })
        // how often do you want the site to request scores from the API?
        timeout1 = setTimeout(refresh, 30 * 1000)
    }

    function AllTheGames() {
        return (
            (scores.games.length > 0) ?
                scores.games.map((game) => {
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

    function handleSoundClick() {
        if (document.querySelector(`.activeSoundButton`)) {
            const sound = document.getElementById(`soundButton`)
            sound.classList.remove('activeSoundButton')
            setVolume(false)
        } else if (document.getElementById(`soundButton`)) {
            const sound = document.getElementById(`soundButton`)
            sound.classList.add('activeSoundButton')
            setVolume(true)
        }
    }

    function soundButton() {
        return (
            <button id='soundButton' onClick={handleSoundClick}>
                {(volume === true) ? "sound on" : "sound off"}
            </button>
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