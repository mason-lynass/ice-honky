import useSound from "use-sound"

function OneGame({ game, horns }) {

    const scoreArray = game.scores

    const [awayHorn] = useSound(horns[game.teams.away.abbreviation])
    const [homeHorn] = useSound(horns[game.teams.home.abbreviation])

    return (
        <div class="oneGame">
            <h2 class="teamNames">
                {game.teams.away.locationName} {game.teams.away.teamName} vs. {game.teams.home.locationName} {game.teams.home.teamName}
            </h2>
            <h2>
                <button onClick={awayHorn}>🚨</button> | <button onClick={homeHorn}>🚨</button>
            </h2>
            <p class="gameScore">
                {Object.values(scoreArray)[0]} - {Object.values(scoreArray)[1]}
            </p>
        </div>

    )
}

export default OneGame