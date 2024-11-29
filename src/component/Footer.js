import { useEffect } from "react"

// timers
export default function Footer({seconds, setSeconds, finishTheTime}) {

  useEffect(()=> {

    if (seconds <= 0) {
      finishTheTime()
    };

    const timer = setInterval(()=> {
      setSeconds()
    }, 1000)

    return() => clearInterval(timer);
  }, [seconds])

  const formatTime = (timeInSeconde) => {
    const minutes = Math.floor(timeInSeconde / 60).toString().padStart(2, '0')
    const seconds = (timeInSeconde % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  return(
     <p className="timer" >{formatTime(seconds)}</p>
  )
}