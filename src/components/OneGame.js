import "../CSS/OneGame.css";
import useSound from "use-sound";
import AllGames from "./AllGames";

function OneGame({ game, horns }) {
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
    // console.log(allGoals[i])
    // console.log(game.teams.home.abbreviation)
    if (allGoals[i].team === game.teams.away.abbreviation) {
      awayGoals.push(allGoals[i]);
      //   i++;
    } else if (allGoals[i].team === game.teams.home.abbreviation) {
      homeGoals.push(allGoals[i]);
      //   i++;
    }
  }

  //   console.log(game)

  console.log(awayGoals);
  console.log(homeGoals);
  //   console.log(allGoals);

  function teamGoals(goals) {
    return goals.map((goal) => {
      console.log(goal.scorer.player);
      return <p>{goal.scorer.player}</p>;
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

  return (
    <div className="oneGame">
      <div className="infoFlex">
        <div className="awayTeamInfo">
          <h2 className="awayTeamName">
            {game.teams.away.locationName} {game.teams.away.teamName}
          </h2>
          <img src="" className="awayLogo" />
          <p>
            {awayRecord[0]}-{awayRecord[1]}-{awayRecord[2]}
          </p>
          <div>{teamGoals(awayGoals)}</div>
        </div>

        <div className="OGCenter">
          <p>{time} PST</p>
          <h4>{Object.values(game.status)}</h4>
          <h1 className="gameScore">
            {Object.values(scoreArray)[0]} - {Object.values(scoreArray)[1]}
          </h1>
        </div>

        <div className="awayTeamInfo">
          <h2 className="awayTeamName">
            {game.teams.home.locationName} {game.teams.home.teamName}
          </h2>
          <img src="" className="homeLogo" />
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
