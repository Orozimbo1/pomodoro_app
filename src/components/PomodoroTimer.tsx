import { useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import Button from "./Button";
import Timer from "./Timer";

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

  useEffect(() => {
    working ? document.body.classList.add('working') : document.body.classList.remove('working')
  }, [working])

  useInterval(() => {
    setMaintime(mainTime - 1)
  }, timeCounting ? 200 : null)

  const configWork = (): void => {
    setTimeCounting(true)
    setWorking(true)
  }

  const configRest = (): void => {
    setTimeCounting(false)
    setWorking(false)
  }

  return (
    <div className="pomodoro">
      <h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>
      <Timer mainTimer={mainTime} />
      <div className="controls">
        <Button text="trabalhar" onClick={configWork} />
        <Button text="pausar" onClick={configRest}/>
        <Button text="recomeçar" onClick={() => {
          setTimeCounting(false);
          setMaintime(props.pomodoroTime)
        }}/>
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