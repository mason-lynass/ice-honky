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
      return (
        <p className="oneGoal">
          {goal.scorer.player} ({goal.scorer.seasonTotal}) - P{goal.period}-{goal.min}:{goal.sec}
        </p>
      );
    });
  }

  // console.log(game);

  //
  const [awayHorn] = useSound(horns[game.teams.away.abbreviation]);
  const [homeHorn] = useSound(horns[game.teams.home.abbreviation]);

  //   console.log(game);

  // information we can put on the scoreboard:
  // team names, team records, start time, status (live, final)
  // team logos
  // score,
  // goals,

  const logosArray = Object.entries(logos);

  function findLogo(team) {
    const logo = logosArray.filter((logo) => logo[0] === team);
    return logo[0][1];
  }

  function displayProgress(game) {
    if (game.status.progress) {
      return (
        <p className="gameProgress">
          {game.status.progress.currentPeriodOrdinal} -{" "}
          {game.status.progress.currentPeriodTimeRemaining.pretty}
        </p>
      );
    } else {
      return <p className="gameProgress">{time} PST</p>;
    }
  }

  return (
    <div className="oneGame">
      <div className="infoFlex">
        <div className="awayTeamInfo">
          <h2 className="awayTeamName">
            {game.teams.away.locationName} {game.teams.away.teamName}
          </h2>
          {/* <img src={Object.values(logos)[0]} className="awayLogo" /> */}
          <img
            src={findLogo(game.teams.away.abbreviation)}
            className="awayLogo"
          />
          <p className="awayRecord">
            {awayRecord[0]}-{awayRecord[1]}-{awayRecord[2]}
          </p>
          <div className="oneTeamGoals">{teamGoals(awayGoals)}</div>
        </div>

        <div className="OGCenter">
          {/* <p>{time} PST</p> */}
          <h4 className="gameStatus">{Object.values(game.status.state)}</h4>
          {displayProgress(game)}
          <h1 className="gameScore">
            {Object.values(scoreArray)[0]} - {Object.values(scoreArray)[1]}
          </h1>
        </div>

        <div className="awayTeamInfo">
          <h2 className="awayTeamName">
            {game.teams.home.locationName} {game.teams.home.teamName}
          </h2>
          <img
            src={findLogo(game.teams.home.abbreviation)}
            className="homeLogo"
          />
          <p className="homeRecord">
            {homeRecord[0]}-{homeRecord[1]}-{homeRecord[2]}
          </p>
          <div className="oneTeamGoals">{teamGoals(homeGoals)}</div>
        </div>
      </div>

      {/* <h2>
                <button onClick={awayHorn}>🚨</button> | <button onClick={homeHorn}>🚨</button>
            </h2> */}
    </div>
  );
}

export default OneGame;
