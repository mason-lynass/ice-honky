function RecentGoal({ scores, teamWGoals, handleCloseRG, logos, doubleGoalSameTeam }) {

    // the team that scored
    const team = Object.values(teamWGoals)

    const gameWeCareAbout = scores.games.filter((game) => game.teams.away.abbreviation === team[0] || game.teams.home.abbreviation === team[0])

    const teamGoals = []

    gameWeCareAbout[0].goals.forEach((goal) => {
        if (goal.team === team[0]) {
            teamGoals.push(goal)
        }
    })

    function sliceAmt() {
        if (doubleGoalSameTeam) return -2
        else return -1
    }

    const latestGoal = (teamGoals.slice(sliceAmt()))[0]
    const player = latestGoal.scorer.player
    let playerTotal = latestGoal.scorer.seasonTotal
    if (player === null) {
        player = ""
        playerTotal = ""
    }

    let second = latestGoal.sec
    if (second !== undefined && second.toString().length === 1) {
        second = `0${latestGoal.sec}`
    }
    let time = `${latestGoal.min}:${second}`

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
        time = ''
        playerTotal = ''
    }

    const logo = Object.entries(logos).filter((logo) => logo[0] === latestGoal.team)

    const assists = latestGoal.assists

    function showAssists() {

        return (
            (assists !== undefined && assists.length > 0) ?
                assists.map((ast) => {
                    const player = ast.player
                    const total = ast.seasonTotal

                    return (
                        <p key={player} className="assist">{player} ({total})</p>
                    )
                })
                : <p className="assist">unassisted</p>
        )

    }

    return (
        <div id="recentGoalContainer" onClick={e => e.stopPropagation()}>
            <button id="RGClose" onClick={handleCloseRG}>x</button>
            <div id='recentGoal'>
                <h1>{latestGoal.team} just scored!</h1>
                <img id="RGLogo" src={logo[0][1]} alt={latestGoal.team} />
                <h3>{player} ({playerTotal})</h3>
                <h3>{scoredAt}</h3>
                <div>
                    {(assists !== undefined && assists.length > 0) ?
                        <p id="allAssists">AST: </p> :
                        <p id="allAssists"></p>
                    }
                    {showAssists()}
                </div>

            </div>
        </div>


    )
}

export default RecentGoal