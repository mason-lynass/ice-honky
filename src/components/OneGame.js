function OneGame({ game }) {

    const scoreArray = game.scores

    return (
        <div>
            <h2>{game.teams.away.locationName} {game.teams.away.teamName} vs. {game.teams.home.locationName} {game.teams.home.teamName}</h2>
            <p>{Object.values(scoreArray)[0]} - {Object.values(scoreArray)[1]}</p>
        </div>

    )
}

export default OneGame