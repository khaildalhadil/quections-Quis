
export default function Start({questions, startQues}) {

  return(
    <div className="start" >
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button 
        className="btn"
        onClick={startQues}
      >Start Quiz</button>
    </div>
  )
}