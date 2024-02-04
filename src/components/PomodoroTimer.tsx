import { useState } from "react";
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

  useInterval(() => {
    setMaintime(mainTime - 1)
  }, 1000)

  return (
    <div className="pomodoro">
      <h2>Você está: trabalhando</h2>
      <Timer mainTimer={mainTime} />
      <div className="controls">
        <Button text="teste" />
        <Button text="teste" />
        <Button text="teste" />
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