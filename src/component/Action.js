import Progress from "./Progress";

export default function Action(
    {
      questions,
      index,
      inc, 
      showResult, 
      ask, 
      checkTheAnser,
      points,
      totalQuectionLen,
      totalPoints,
      clickedIndex
    }) {

  if (index === totalQuectionLen) {
    showResult()
    return
  }

  const disabled = !ask;
  return(
    <div className="main" >
      <Progress 
        index={index} 
        totalQuectionLen={totalQuectionLen}
        points={points} 
        totalPoints={totalPoints}
        answer={disabled}
      />
      <h3>{questions[index].question} </h3>
      <ul>
        <Item 
          key={index} 
          options={questions[index].options} 
          anserNum={questions[index].correctOption}
          checkTheAnser={checkTheAnser}
          ask={ask}
          disabled={disabled}
          clickedIndex={clickedIndex}
        />
      </ul>
      {disabled && 
        <BtnNext
          lastIndex={index===14}
          disabled={disabled}
          inc={inc}
          showResult={showResult}
        />
      }
    </div>
  )
}

function Item(
  {
    options, 
    anserNum, 
    checkTheAnser, 
    ask, 
    disabled,
    clickedIndex
  }) {

  return(
    options.map((option, i) => 
    <button 
      disabled={disabled}
      key={i}
      className={`
        options 
        btn 
        btn-option 
        ${!ask ? clickedIndex === i && `answer`: ''}
        ${!ask ? anserNum === i ? `correct  `: `wrong`: ''}
      `}
      onClick={()=> checkTheAnser(i, anserNum)}
      >
      <h4 >{option}</h4>
    </button>
    )
  )
}

function BtnNext({inc, disabled, lastIndex, showResult}) {
  if (!lastIndex) {
    return (
      <button
        onClick={inc}  
        className="btn btn-ui"
        disabled={!disabled}
      >next</button>
    )
  }
  else {
    return(
      <button
        onClick={showResult}  
        className="btn btn-ui"
        disabled={!disabled}
        >Finish
      </button>
    )
  }
}