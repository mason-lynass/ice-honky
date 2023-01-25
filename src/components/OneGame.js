import "../CSS/OneGame.css";
import useSound from "use-sound";
import AllGames from "./AllGames";

function OneGame({ game, horns, logos }) {
  // score
  const scoreArray = game.scores;

  // to access team records
  const recordsObject = game.currentStats.records;
  const awayRecordObject = Object.entries(recordsObject)[0][1];
  const homeRecordObject = Object.entries(recordsObject)[1][1];

  const awayRecord = Object.values(awayRecordObject);
  const homeRecord = Object.values(homeRecordObject);

  // to show the game start time
  const event = new Date(game.startTime).toTimeString();
  const time = event.slice(0, 5);

  const allGoals = game.goals;

  let awayGoals = [];
  let homeGoals = [];

  for (let i = 0; i < allGoals.length; i++) {
    if (allGoals[i].team === game.teams.away.abbreviation) {
      awayGoals.push(allGoals[i]);
    } else if (allGoals[i].team === game.teams.home.abbreviation) {
      homeGoals.push(allGoals[i]);
    }
  }

  function teamGoals(goals) {
    return goals.map((goal) => {
    //   console.log(goal.scorer.player);
      return <p>{goal.scorer.player} ({goal.scorer.seasonTotal})</p>;
    });
  }

  //
  const [awayHorn] = useSound(horns[game.teams.away.abbreviation]);
  const [homeHorn] = useSound(horns[game.teams.home.abbreviation]);

  //   console.log(game);

  // information we can put on the scoreboard:
  // team names, team records, start time, status (live, final)
  // team logos
  // score,
  // goals,

  const logosArray = Object.entries(logos)
//   .filter((logo) => logo.keys === game.teams.away.abbreviation)

//   console.log(Object.values(logos)[0])
console.log(logosArray)

  function findLogo(team) {
    console.log(team)
    const logo = logosArray.filter((logo) => logo[0] === team)
    console.log(logo)

    return (logo[0][1])
  }

  return (
    <div className="oneGame">
      <div className="infoFlex">
        <div className="awayTeamInfo">
          <h2 className="awayTeamName">
            {game.teams.away.locationName} {game.teams.away.teamName}
          </h2>
          {/* <img src={Object.values(logos)[0]} className="awayLogo" /> */}
          <img src={findLogo(game.teams.away.abbreviation)} className="awayLogo" />
          <p>
            {awayRecord[0]}-{awayRecord[1]}-{awayRecord[2]}
          </p>
          <div>{teamGoals(awayGoals)}</div>
        </div>

        <div className="OGCenter">
          <p>{time} PST</p>
          <h4>{Object.values(game.status.state)}</h4>
          <h1 className="gameScore">
            {Object.values(scoreArray)[0]} - {Object.values(scoreArray)[1]}
          </h1>
        </div>

        <div className="awayTeamInfo">
          <h2 className="awayTeamName">
            {game.teams.home.locationName} {game.teams.home.teamName}
          </h2>
          <img src={findLogo(game.teams.home.abbreviation)} className="homeLogo" />
          <p>
            {homeRecord[0]}-{homeRecord[1]}-{homeRecord[2]}
          </p>
          <div>{teamGoals(homeGoals)}</div>
        </div>
      </div>

      {/* <h2>
                <button onClick={awayHorn}>🚨</button> | <button onClick={homeHorn}>🚨</button>
            </h2> */}
    </div>
  );
}

export default OneGame;
