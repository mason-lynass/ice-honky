import OneGame from "./OneGame"
import { useState, useEffect } from "react"
import useSound from "use-sound";

function AllGames({ horns, logos, setCurrentPage }) {

    const [scores, setScores] = useState({})
    const [scoresLoaded, setScoresLoaded] = useState(false)

    setCurrentPage("home")

    // prepare all of the buzzers... couldnt think of a cleaner way to do this...

    const [ANAhorn] = useSound(horns.ANA)
    const [ARIhorn] = useSound(horns.ARI)
    const [BOShorn] = useSound(horns.BOS)
    const [BUFhorn] = useSound(horns.BUF)
    const [CARhorn] = useSound(horns.CAR)
    const [CBJhorn] = useSound(horns.CBJ)
    const [CGYhorn] = useSound(horns.CGY)
    const [CHIhorn] = useSound(horns.CHI)
    const [COLhorn] = useSound(horns.COL)
    const [DALhorn] = useSound(horns.DAL)
    const [DEThorn] = useSound(horns.DET)
    const [EDMhorn] = useSound(horns.EDM)
    const [FLAhorn] = useSound(horns.FLA)
    const [LAKhorn] = useSound(horns.LAK)
    const [MINhorn] = useSound(horns.MIN)
    const [MTLhorn] = useSound(horns.MTL)
    const [NJDhorn] = useSound(horns.NJD)
    const [NSHhorn] = useSound(horns.NSH)
    const [NYIhorn] = useSound(horns.NYI)
    const [NYRhorn] = useSound(horns.NYR)
    const [OTThorn] = useSound(horns.OTT)
    const [PHIhorn] = useSound(horns.PHI)
    const [PIThorn] = useSound(horns.PIT)
    const [SEAhorn] = useSound(horns.SEA)
    const [SJShorn] = useSound(horns.SJS)
    const [STLhorn] = useSound(horns.STL)
    const [TBLhorn] = useSound(horns.TBL)
    const [TORhorn] = useSound(horns.TOR)
    const [VANhorn] = useSound(horns.VAN)
    const [VGKhorn] = useSound(horns.VGK)
    const [WPGhorn] = useSound(horns.WPG)
    const [WSHhorn] = useSound(horns.WSH)

    function soundTeamHorn(abb) {
        if (abb === 'ANA') return ANAhorn()
        if (abb === 'ARI') return ARIhorn()
        if (abb === 'BOS') return BOShorn()
        if (abb === 'BUF') return BUFhorn()
        if (abb === 'CAR') return CARhorn()
        if (abb === 'CBJ') return CBJhorn()
        if (abb === 'CGY') return CGYhorn()
        if (abb === 'CHI') return CHIhorn()
        if (abb === 'COL') return COLhorn()
        if (abb === 'DAL') return DALhorn()
        if (abb === 'DET') return DEThorn()
        if (abb === 'EDM') return EDMhorn()
        if (abb === 'FLA') return FLAhorn()
        if (abb === 'LAK') return LAKhorn()
        if (abb === 'MIN') return MINhorn()
        if (abb === 'MTL') return MTLhorn()
        if (abb === 'NJD') return NJDhorn()
        if (abb === 'NSH') return NSHhorn()
        if (abb === 'NYI') return NYIhorn()
        if (abb === 'NYR') return NYRhorn()
        if (abb === 'OTT') return OTThorn()
        if (abb === 'PHI') return PHIhorn()
        if (abb === 'PIT') return PIThorn()
        if (abb === 'SEA') return SEAhorn()
        if (abb === 'SJS') return SJShorn()
        if (abb === 'STL') return STLhorn()
        if (abb === 'TBL') return TBLhorn()
        if (abb === 'TOR') return TORhorn()
        if (abb === 'VAN') return VANhorn()
        if (abb === 'VGK') return VGKhorn()
        if (abb === 'WPG') return WPGhorn()
        if (abb === 'WSH') return WSHhorn()
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

                        } else {
                            console.log(Object.keys(updateObject)[teamIdx], "didn't score since last check")
                        }
                        teamIdx = teamIdx + 1
                    }
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