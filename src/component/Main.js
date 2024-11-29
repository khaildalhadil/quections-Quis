import { useReducer, useEffect } from "react";
import Loader from './Loader';
import Start from './Start';
import Error from './Error';
import Action from './Action';
import Result from './Result';
import Footer from "./Footer";
 
export default function Main() {

  const init = {
    questions: [],
    index: 0,
    ask: true,
    points: 0,
    status: 'loading',
    clickedIndex: null,
    highScor: 0,
    seconds: 300
  }

  function reducer(state, action) {
      
    switch(action.type){
      case 'ready':
        return {
          ...state,
          status: 'ready',
          questions: state.questions.length > 1 ? state.questions: action.questions,
        }
      case 'start':
        return {
          ...state,
          status: 'start'
        }
      case 'action':
        return {
          ...state,
          status: 'action'
        }
      case 'addOne':
        return {
          ...state,
          index: state.index+1
        }
      case 'finish':
        return {
          ...state,
          status: 'finished',
          highScor: 
            state.points > state.highScor ? 
              state.highScor = state.points: 
              state.highScor
         }
      case 'trgger':
        return {
          ...state,
          ask: !state.ask
        }
      case 'changeIndex':
        return {
          ...state,
          clickedIndex: action.i
        }
      case 'error':
        return {
          ...state,
          status: 'error'
        }
      case 'addPoints':
        return {
          ...state,
          points: state.questions[state.index].points + state.points,
        }
      case 'restart':
        return {
          ...state,
          index: 0,
          ask: true,
          points: 0,
          seconds: 300,
          status: 'ready' 
        }
        case 'setSeconds':
          return {
            ...state,
            seconds: state.seconds - 1,
          }
      }
    }
    
  const [{
    questions, 
    index, 
    status, 
    ask, 
    points, 
    clickedIndex,
    highScor,
    seconds
  }, displticn] = useReducer(reducer, init)
  
  useEffect(()=> {
    async function getData() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        const data = await res.json();
        displticn({questions: data, type: 'ready'});
      } catch(err) {
        displticn({type: 'error'});
      }
    }
    getData();
  }, [])

  function startQues() {
    displticn({type: 'action'})
  }

  function handleIncriment() {
    displticn({type: 'addOne'})
    displticn({type: 'trgger'})
  }

  function handleShowResult() {
    displticn({type: 'finish'})
  }

  function handleAskBool(indexElement, anserNum) {
    displticn({type: 'trgger'})
    displticn({type: 'changeIndex', i: indexElement})
    if (indexElement === anserNum) {
      displticn({type: 'addPoints',})
    }
  }

  function handleRestartQue() {
    displticn({type: 'restart'});
    // displticn({type: 'ready'});
  }

  function handleSetSeconds() {
    displticn({type: 'setSeconds'})
  }

  function handleFinishTheTime() {
    displticn({type: 'finish'})
  }


  let totalPoints = questions.map(el => el.points).reduce((curr, next) => curr + next ,0);
  const totalQuectionLen = questions.length

  return(
    <div className="main" >
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && <Start questions={questions} startQues={startQues} />}
      {status === 'action' && 
      <>
        <Action 
          questions={questions} 
          index={index} 
          inc={handleIncriment} 
          showResult={handleShowResult} 
          ask={ask}
          checkTheAnser={handleAskBool}
          points={points}
          totalQuectionLen={totalQuectionLen}
          totalPoints={totalPoints}
          clickedIndex={clickedIndex}
        />
        <Footer 
          seconds={seconds}
          setSeconds={handleSetSeconds}
          finishTheTime={handleFinishTheTime}
           />
      </>

      }
      {status === 'finished' && <Result 
        points={points} 
        totalPoints={totalPoints} 
        highScor={highScor}
        restart={handleRestartQue}
      />}
    </div>
  )
}