import "../CSS/OneGame.css";

function OneGame({ game, horns, logos }) {

  // for the All Star game, turn off the logos and the records in the JSX
  // including recordsObjects and Records
  // findLogo function

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

  // this is how the goals show up in two split columns
  const allGoals = game.goals;
  let awayGoals = [];
  let homeGoals = [];

  for (let i = 0; i < allGoals.length; i++) {
    awayGoals.push(allGoals[i]);
    homeGoals.push(allGoals[i]);
  }

  const mobileScreen = window.matchMedia("(max-width: 500px)")

  function teamGoals(goals, team) {
    if (mobileScreen.matches) {
      goals = goals.splice(-2)
    }

    return goals.map((goal) => {

      let second = goal.sec
      // catch for SO goals
      if (goal.sec === undefined) {
        second = ``
        // catch for goals that happen at xx:0x
      } if (second.toString().length === 1) {
        second = `0${goal.sec}`
      }

      let min = goal.min
      let time = `-${min}:${second}`

      let period = goal.period
      if (period === 1 || period === 2 || period === 3) {
        period = `P${goal.period}`
      }

      let seasonTotal = `(${goal.scorer.seasonTotal})`
      // simplifying text of SO goals
      if (period === `SO`) {
        seasonTotal = ``
        time = ``
        min = ``
      }

      if (goal.team === team) {
        return (
          <p className="oneGoal player-goal-background">
            {goal.scorer.player} {seasonTotal} - {goal.period}{time}
          </p>
        )
      } else return (<p className="oneGoal"></p>)
    });
  }

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
    } else if (game.status.state === "FINAL") {
      return <p className="gameProgress"></p>
    } else {
      return <p className="gameProgress">{time} PST</p>;
    }
  }

  function gameGoals() {
    return (
      <div className="gameGoals">
        <div className="oneTeamGoals">
          {teamGoals(awayGoals, game.teams.away.abbreviation)}
        </div>
        <hr></hr>
        <div className="oneTeamGoals">
          {teamGoals(homeGoals, game.teams.home.abbreviation)}
        </div>
      </div>
    )
  }

  function renderLiveDot(status) {
    if(status === "LIVE") {
      return " 🔴"
    }
  }

  return (
    <div className="oneGame">
      <div className="infoFlex">
        <div className="awayTeamInfo">
          <h2 className="awayTeamName">
            {game.teams.away.locationName} {game.teams.away.teamName}
          </h2>
          <img
            src={findLogo(game.teams.away.abbreviation)}
            className="awayLogo" alt='away team logo'
          />
          <p className="awayRecord">
            {awayRecord[0]}-{awayRecord[1]}-{awayRecord[2]}
          </p>
          {/* <div className="oneTeamGoals">{teamGoals(awayGoals)}</div> */}
        </div>

        <div className="OGCenter">
          {/* <p>{time} PST</p> */}
          <h4 className="gameStatus">
            {Object.values(game.status.state)}
            <smaller>{renderLiveDot(game.status.state)}</smaller>
          </h4>
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
            alt='home team logo'
          />
          <p className="homeRecord">
            {homeRecord[0]}-{homeRecord[1]}-{homeRecord[2]}
          </p>
          {/* <div className="oneTeamGoals">{teamGoals(homeGoals)}</div> */}
        </div>
      </div>

      {/* <h2>
                <button onClick={awayHorn}>🚨</button> | <button onClick={homeHorn}>🚨</button>
            </h2> */}
      <div>
        {gameGoals()}
      </div>
    </div>
  );

}

export default OneGame;
