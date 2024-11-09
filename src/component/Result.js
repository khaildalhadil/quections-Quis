

export default function Result(
  {points, totalPoints, highScor, restart}) {

  const prsntge = Math.round(Number(points/totalPoints)*100);

  let emoji;

  if (prsntge === 100) emoji = '🥇';
  if (prsntge >= 80) emoji = '🥈';
  if (prsntge >= 60) emoji = '🥉';
  if (prsntge >= 40) emoji = '🏅';
  if (prsntge >= 1) emoji = '🎖';
  else emoji = '💔😞';

  return(
    <>
      <div className="result" >
        <p>{emoji}you scored <span >{points}</span>out of {totalPoints} ({prsntge}%)</p>
      </div>
      <p className="highscore">(Highscore: {highScor} points)</p>
      <button className="btn" onClick={restart} >Restart Quiz</button>
    </>
  )
}