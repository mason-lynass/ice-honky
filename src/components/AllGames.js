import OneGame from "./OneGame"
import { useState, useEffect } from "react"
import ANAhorn from "../audio/mp3s/ANA.mp3"
import ARIhorn from "../audio/mp3s/ARI.mp3"
import BOShorn from "../audio/mp3s/BOS.mp3"
import BUFhorn from "../audio/mp3s/BUF.mp3"
import CARhorn from "../audio/mp3s/CAR.mp3"
import CBJhorn from "../audio/mp3s/CBJ.mp3"
import CGYhorn from "../audio/mp3s/CGY.mp3"
import CHIhorn from "../audio/mp3s/CHI.mp3"
import COLhorn from "../audio/mp3s/COL.mp3"
import DALhorn from "../audio/mp3s/DAL.mp3"
import DEThorn from "../audio/mp3s/DET.mp3"
import EDMhorn from "../audio/mp3s/EDM.mp3"
import FLAhorn from "../audio/mp3s/FLA.mp3"
import LAKhorn from "../audio/mp3s/LAK.mp3"
import MINhorn from "../audio/mp3s/MIN.mp3"
import MTLhorn from "../audio/mp3s/MTL.mp3"
import NJDhorn from "../audio/mp3s/NJD.mp3"
import NSHhorn from "../audio/mp3s/NSH.mp3"
import NYIhorn from "../audio/mp3s/NYI.mp3"
import NYRhorn from "../audio/mp3s/NYR.mp3"
import OTThorn from "../audio/mp3s/OTT.mp3"
import PHIhorn from "../audio/mp3s/PHI.mp3"
import PIThorn from "../audio/mp3s/PIT.mp3"
import SEAhorn from "../audio/mp3s/SEA.mp3"
import SJShorn from "../audio/mp3s/SJS.mp3"
import STLhorn from "../audio/mp3s/STL.mp3"
import TBLhorn from "../audio/mp3s/TBL.mp3"
import TORhorn from "../audio/mp3s/TOR.mp3"
import VANhorn from "../audio/mp3s/VAN.mp3"
import VGKhorn from "../audio/mp3s/VGK.mp3"
import WPGhorn from "../audio/mp3s/WPG.mp3"
import WSHhorn from "../audio/mp3s/WSH.mp3"

function AllGames({ horns, logos, setCurrentPage }) {

    const [scores, setScores] = useState({})
    const [scoresLoaded, setScoresLoaded] = useState(false)

    setCurrentPage("home")
    
    function soundTeamHorn(abb) {
        if (abb === 'ANA') return new Audio(ANAhorn).play()
        if (abb === 'ARI') return new Audio(ARIhorn).play()
        if (abb === 'BOS') return new Audio(BOShorn).play()
        if (abb === 'BUF') return new Audio(BUFhorn).play()
        if (abb === 'CAR') return new Audio(CARhorn).play()
        if (abb === 'CBJ') return new Audio(CBJhorn).play()
        if (abb === 'CGY') return new Audio(CGYhorn).play()
        if (abb === 'CHI') return new Audio(CHIhorn).play()
        if (abb === 'COL') return new Audio(COLhorn).play()
        if (abb === 'DAL') return new Audio(DALhorn).play()
        if (abb === 'DET') return new Audio(DEThorn).play()
        if (abb === 'EDM') return new Audio(EDMhorn).play()
        if (abb === 'FLA') return new Audio(FLAhorn).play()
        if (abb === 'LAK') return new Audio(LAKhorn).play()
        if (abb === 'MIN') return new Audio(MINhorn).play()
        if (abb === 'MTL') return new Audio(MTLhorn).play()
        if (abb === 'NJD') return new Audio(NJDhorn).play()
        if (abb === 'NSH') return new Audio(NSHhorn).play()
        if (abb === 'NYI') return new Audio(NYIhorn).play()
        if (abb === 'NYR') return new Audio(NYRhorn).play()
        if (abb === 'OTT') return new Audio(OTThorn).play()
        if (abb === 'PHI') return new Audio(PHIhorn).play()
        if (abb === 'PIT') return new Audio(PIThorn).play()
        if (abb === 'SEA') return new Audio(SEAhorn).play()
        if (abb === 'SJS') return new Audio(SJShorn).play()
        if (abb === 'STL') return new Audio(STLhorn).play()
        if (abb === 'TBL') return new Audio(TBLhorn).play()
        if (abb === 'TOR') return new Audio(TORhorn).play()
        if (abb === 'VAN') return new Audio(VANhorn).play()
        if (abb === 'VGK') return new Audio(VGKhorn).play()
        if (abb === 'WPG') return new Audio(WPGhorn).play()
        if (abb === 'WSH') return new Audio(WSHhorn).play()
    }

    // intial fetch -- no buzzer sounds -- set up an object of all the current goals, so we know when to toot a horn
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
                    //create updateObject to comapare to the goalsObject. if a team has a different score, toot their horn
                    scores.games.map((game) => {
                        updateObject[Object.keys(game.scores)[0]] = Object.values(game.scores)[0]
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
        setTimeout(refresh, 30 * 1000)
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