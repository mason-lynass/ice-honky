function RecentGoal({ scores, teamWGoals, handleCloseRG, logos }) {

    // the team that scored
    const team = Object.values(teamWGoals)

    const gameWeCareAbout = scores.games.filter((game) => game.teams.away.abbreviation === team[0] || game.teams.home.abbreviation === team[0])

    const latestGoal = (gameWeCareAbout[0].goals.slice(-1))[0]
    console.log(latestGoal)
    const player = latestGoal.scorer.player
    const playerTotal = latestGoal.scorer.seasonTotal
    let second = latestGoal.sec
    if (second.toString().length === 1) {
        second = `0${latestGoal.sec}`
    }
    const time = `${latestGoal.min}:${second}`

    let period = latestGoal.period
    if (period === "1") {
        period = "1st"
    } else if (period === "2") {
        period = "2nd"
    } else if (period === "3") {
        period = "3rd"
    }
    let scoredAt = `${period} - ${time}`
    if (period === "SO") {
        scoredAt = `${period}`
    }

    const logo = Object.entries(logos).filter((logo) => logo[0] === latestGoal.team)

    const assists = latestGoal.assists

    function showAssists() {

        return (
            (assists.length > 0) ?
                assists.map((ast) => {
                    const player = ast.player
                    const total = ast.seasonTotal

                    return (
                        <p className="assist">{player} ({total})</p>
                    )
                })
                : <p className="assist">unassisted</p>
        )

    }

    return (
        <div id="recentGoalContainer">
            <button id="RGClose" onClick={handleCloseRG}>x</button>
            <div id='recentGoal'>
                <h1>{latestGoal.team} just scored!</h1>
                <img id="RGLogo" src={logo[0][1]} alt={latestGoal.team} />
                <h3>{player} ({playerTotal})</h3>
                <h3>{scoredAt}</h3>
                <div>
                    <p id="allAssists">AST: </p>
                    {showAssists()}
                </div>

            </div>
        </div>


    )
}

export default RecentGoal