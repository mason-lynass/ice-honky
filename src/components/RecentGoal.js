function RecentGoal({ scores, teamWGoals, handleCloseRG, logos}) {

    // the team that scored
    const team = Object.values(teamWGoals)

    const gameWeCareAbout = scores.games.filter((game) => game.teams.away.abbreviation === team[0] || game.teams.home.abbreviation === team[0])

    const latestGoal = (gameWeCareAbout[0].goals.slice(-1))[0]
    const player = latestGoal.scorer.player
    const playerTotal = latestGoal.scorer.seasonTotal
    const time = `${latestGoal.min}:${latestGoal.sec}`

    let period = latestGoal.period
    if (period === "1") {
        period = "1st"
    } else if (period === "2") {
        period = "2nd"
    } else if (period === "3") {
        period = "3rd"
    }
    const scoredAt = `${period} - ${time}`

    const logo = Object.entries(logos).filter((logo) => logo[0] === latestGoal.team)

    const assists = latestGoal.assists

    function showAssists() {
        return (
            assists.map((ast) => {
                const player = ast.player
                const total = ast.seasonTotal
    
                return (
                    <p className="assist">{player} ({total})</p>
                )
            })
        )
        
    }

    return (
        <div id="recentGoalContainer">
            <button id="RGClose" onClick={handleCloseRG}>x</button>
            <div id='recentGoal'>
                <h1>{team[0]} just scored!</h1>
                <img id="RGLogo" src={logo[0][1]} alt={team[0]}/>
                <h3>{player} ({playerTotal})</h3>
                <h3>{scoredAt}</h3>
                <p id="allAssists">AST: {showAssists()}</p>
            </div>
        </div>


    )
}

export default RecentGoal