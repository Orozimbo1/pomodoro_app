import { useCallback, useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import Button from "./Button";
import Timer from "./Timer";

import bellStart from '../sounds/bell-start.mp3';
import bellFinish from '../sounds/bell-finish.mp3';
import { secondsToTime } from "../utils/secondsToTime";

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
  const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.cycles - 1).fill(true));

  const [completedCycles, setCompletedCycles] = useState(0)
  const [fullWorkingTime, setFullWorkingTime] = useState(0)
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0)

  useInterval(() => {
    setMaintime(mainTime - 1)
    if(working) setFullWorkingTime(fullWorkingTime + 1)
  }, timeCounting ? 1000 : null)

  const configWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMaintime(props.pomodoroTime);
    audioStartWork.play();
  }, [setTimeCounting, setWorking, setResting, setMaintime, props.pomodoroTime, audioStartWork])

  const configRest = useCallback((long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);
    
    if(long) {
      setMaintime(props.longRestTime);
    } else {
      setMaintime(props.shortRestTime);
    }
    audioStopWork.play();
  }, [setTimeCounting, setWorking, setResting, setMaintime, props.longRestTime, props.shortRestTime, audioStopWork])

  useEffect(() => {
    if(working) document.body.classList.add('working');
    if(resting) document.body.classList.remove('working');

    if(mainTime > 0) return;

    if(working && cyclesQtdManager.length > 0) {
      configRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1)
    }

    if(working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if(resting) configWork();

  }, [
    working, 
    resting, 
    mainTime, 
    cyclesQtdManager,
    numberOfPomodoros, 
    completedCycles,
    configRest, 
    setCyclesQtdManager, 
    configWork,
    props.cycles
  ])

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
        <p>Ciclos concluídos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Pomodoros concluídos: {numberOfPomodoros}</p>
      </div>
    </div>
  )
}

export default PomodoroTimer