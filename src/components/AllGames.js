import OneGame from "./OneGame"
import { useState, useEffect } from "react"
// import ANA from "../audio/mp3s/ANA.mp3"
// import ARI from "../audio/mp3s/ARI.mp3"
// import BOS from "../audio/mp3s/BOS.mp3"
// import BUF from "../audio/mp3s/BUF.mp3"
// import CAR from "../audio/mp3s/CAR.mp3"
// import CBJ from "../audio/mp3s/CBJ.mp3"
// import CGY from "../audio/mp3s/CGY.mp3"
// import CHI from "../audio/mp3s/CHI.mp3"
// import COL from "../audio/mp3s/COL.mp3"
// import DAL from "../audio/mp3s/DAL.mp3"
// import DET from "../audio/mp3s/DET.mp3"
// import EDM from "../audio/mp3s/EDM.mp3"
// import FLA from "../audio/mp3s/FLA.mp3"
// import LAK from "../audio/mp3s/LAK.mp3"
// import MIN from "../audio/mp3s/MIN.mp3"
// import MTL from "../audio/mp3s/MTL.mp3"
// import NJD from "../audio/mp3s/NJD.mp3"
// import NSH from "../audio/mp3s/NSH.mp3"
// import NYI from "../audio/mp3s/NYI.mp3"
// import NYR from "../audio/mp3s/NYR.mp3"
// import OTT from "../audio/mp3s/OTT.mp3"
// import PHI from "../audio/mp3s/PHI.mp3"
// import PIT from "../audio/mp3s/PIT.mp3"
// import SEA from "../audio/mp3s/SEA.mp3"
// import SJS from "../audio/mp3s/SJS.mp3"
// import STL from "../audio/mp3s/STL.mp3"
// import TBL from "../audio/mp3s/TBL.mp3"
// import TOR from "../audio/mp3s/TOR.mp3"
// import VAN from "../audio/mp3s/VAN.mp3"
// import VGK from "../audio/mp3s/VGK.mp3"
// import WPG from "../audio/mp3s/WPG.mp3"
// import WSH from "../audio/mp3s/WSH.mp3"

function AllGames({ horns, logos, setCurrentPage }) {

    const [scores, setScores] = useState({})
    const [scoresLoaded, setScoresLoaded] = useState(false)

    setCurrentPage("home")

    // console.log(ANA)
    // console.log(Object.values(horns)[0])
    // console.log(Object.entries(horns).filter((horn) => horn[0] === "ANA")[0][0])

    function soundTeamHorn(abb) {
        
        const teamHornArray = Object.entries(horns).filter((horn) => horn[0] === abb)
        // console.log(teamHornArray)
        return new Audio(teamHornArray[0][1]).play()
        // if (abb === 'ANA') return new Audio(ANA).play()
        // if (abb === 'ARI') return new Audio(ARI).play()
        // if (abb === 'BOS') return new Audio(BOS).play()
        // if (abb === 'BUF') return new Audio(BUF).play()
        // if (abb === 'CAR') return new Audio(CAR).play()
        // if (abb === 'CBJ') return new Audio(CBJ).play()
        // if (abb === 'CGY') return new Audio(CGY).play()
        // if (abb === 'CHI') return new Audio(CHI).play()
        // if (abb === 'COL') return new Audio(COL).play()
        // if (abb === 'DAL') return new Audio(DAL).play()
        // if (abb === 'DET') return new Audio(DET).play()
        // if (abb === 'EDM') return new Audio(EDM).play()
        // if (abb === 'FLA') return new Audio(FLA).play()
        // if (abb === 'LAK') return new Audio(LAK).play()
        // if (abb === 'MIN') return new Audio(MIN).play()
        // if (abb === 'MTL') return new Audio(MTL).play()
        // if (abb === 'NJD') return new Audio(NJD).play()
        // if (abb === 'NSH') return new Audio(NSH).play()
        // if (abb === 'NYI') return new Audio(NYI).play()
        // if (abb === 'NYR') return new Audio(NYR).play()
        // if (abb === 'OTT') return new Audio(OTT).play()
        // if (abb === 'PHI') return new Audio(PHI).play()
        // if (abb === 'PIT') return new Audio(PIT).play()
        // if (abb === 'SEA') return new Audio(SEA).play()
        // if (abb === 'SJS') return new Audio(SJS).play()
        // if (abb === 'STL') return new Audio(STL).play()
        // if (abb === 'TBL') return new Audio(TBL).play()
        // if (abb === 'TOR') return new Audio(TOR).play()
        // if (abb === 'VAN') return new Audio(VAN).play()
        // if (abb === 'VGK') return new Audio(VGK).play()
        // if (abb === 'WPG') return new Audio(WPG).play()
        // if (abb === 'WSH') return new Audio(WSH).play()
    }

    // initial fetch -- no buzzer sounds -- set up an object of all the current goals, so we know when to toot a horn
    let goalsObject = {}
    useEffect(() => {
        fetch("https://nhl-score-api.herokuapp.com/api/scores/latest").then((r) => {
            if (r.ok) {
                r.json().then((scores) => {
                    setScores(scores)
                    setScoresLoaded(true)

                    scores.games.map((game) => {
                        // create goals object to check if there are new goals
                        goalsObject[Object.keys(game.scores)[0]] = Object.values(game.scores)[0]
                        goalsObject[Object.keys(game.scores)[1]] = Object.values(game.scores)[1]
                        console.log(Object.keys(game.scores)[0])
                    })
                    console.log('initial fetch!')
                    console.log(goalsObject)
                })
            }
        })
    }, [])

    // suppositional fetches, do with buzzers
    let timeout1
    let timeout2
    useEffect(() => {
        timeout2 = setTimeout(() => {
            refresh()
        }, 5 * 1000)
        return () => {
            clearTimeout(timeout1)
            clearTimeout(timeout2)
        }
    }, [])

    function refresh() {
        fetch("https://nhl-score-api.herokuapp.com/api/scores/latest").then((r) => {
            if (r.ok) {
                r.json().then((scores) => {

                    setScores(scores)
                    console.log("additional fetch!")

                    let updateObject = {}
                    //create updateObject to compare to the goalsObject. if a team has a different score, toot their horn
                    scores.games.map((game) => {
                        // away
                        updateObject[Object.keys(game.scores)[0]] = Object.values(game.scores)[0]
                        // home
                        updateObject[Object.keys(game.scores)[1]] = Object.values(game.scores)[1]
                    })


                    let teamIdx = 0

                    while (teamIdx < Object.keys(updateObject).length) {
                        // if the new goals object (updateObject) does not equal the goalsObject that means somebody scored, and we need to toot a horn
                        if (Object.values(updateObject)[teamIdx] !== Object.values(goalsObject)[teamIdx]) {

                            console.log(Object.keys(updateObject)[teamIdx], "scored goal number: ", Object.values(updateObject)[teamIdx], "@", Date.now())

                            goalsObject = updateObject

                            soundTeamHorn(Object.keys(updateObject)[teamIdx])

                            // break the while loop so we don't sound 2 horns at the same time
                            break

                        } else {
                            console.log(Object.keys(updateObject)[teamIdx], "didn't score since last check")
                        }
                        teamIdx = teamIdx + 1
                    }
                })
            }
        })
        // mason made this really long
        timeout1 = setTimeout(refresh, 5 * 1000)
    }

    function AllTheGames() {
        return (
            scores.games.map((game) => {
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