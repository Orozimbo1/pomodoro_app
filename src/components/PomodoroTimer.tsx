import { useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import Button from "./Button";
import Timer from "./Timer";

import bellStart from '../sounds/bell-start.mp3';
import bellFinish from '../sounds/bell-finish.mp3';

const audioStartWork = new Audio(bellStart);
const audioStopWork = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

const PomodoroTimer = (props: Props): JSX.Element => {
  const [mainTime, setMaintime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);

  useEffect(() => {
    if(working) document.body.classList.add('working')
    if(resting) document.body.classList.remove('working')
  }, [working])

  useInterval(() => {
    setMaintime(mainTime - 1)
  }, timeCounting ? 200 : null)

  const configWork = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMaintime(props.pomodoroTime);
    audioStartWork.play();
  }

  const configRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);

    if(long) {
      setMaintime(props.longRestTime);
    } else {
      setMaintime(props.shortRestTime);
    }
    audioStopWork.play();
  }

  return (
    <div className="pomodoro">
      <h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>
      <Timer mainTimer={mainTime} />
      <div className="controls">
        <Button text="trabalhar" onClick={configWork} />
        <Button text="descansar" onClick={() => configRest(false)}/>
        <Button 
          className={!working && !resting ? 'hidden' : ''} 
          text={timeCounting ? 'pausar' : 'continuar'} onClick={() => 
          setTimeCounting(!timeCounting)}
        />
      </div>
      <div className="details">
        <p>Lorem ipsum dolor sit amet consectetu</p>
        <p>Lorem ipsum dolor sit amet consectetu</p>
        <p>Lorem ipsum dolor sit amet consectetu</p>
        <p>Lorem ipsum dolor sit amet consectetu</p>
      </div>
    </div>
  )
}

export default PomodoroTimer