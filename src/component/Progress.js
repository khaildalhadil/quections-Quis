

export default function Progress(
  {index, totalQuectionLen, points, totalPoints, answer}
) {
  return (
  <div className="progress" >
    <progress max={totalQuectionLen} value={index + Number(answer===true)} />
    <div className="question__point" >
      <p>Question {++index}/{totalQuectionLen}</p> 
      <p>{points}/{totalPoints} points</p>
    </div>
  </div>
  )
}