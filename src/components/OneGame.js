import useSound from "use-sound"

function OneGame({ game, horns }) {

    const scoreArray = game.scores

    // this doesn't work because it's an object which doesn't have an index
    // so we need to use Object.keys or something like that
    console.log(horns[0])
    const [horn] = useSound(horns[0])

    horn()

    // yeah this doesn't work yet
    // just trying to get a sound when you click the button
    function honkThatHorn (x) {
        console.log(x)
        return (horn)
    }

    return (
        <div class="oneGame">
            <h2 class="teamNames">{game.teams.away.locationName} {game.teams.away.teamName} vs. {game.teams.home.locationName} {game.teams.home.teamName}</h2>
            <h2><button onClick={honkThatHorn(game.teams.away.abbreviation)}>🚨</button> | <button onClick={honkThatHorn(game.teams.home.abbreviation)}>🚨</button></h2>
            <p class="gameScore">{Object.values(scoreArray)[0]} - {Object.values(scoreArray)[1]}</p>
        </div>

    )
}

export default OneGame