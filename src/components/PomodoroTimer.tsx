import { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { secondsToTime } from "../utils/secondsToTime";
import Button from "./Button";
import Timer from "./Timer";

interface Props {
  defaultPomodoroTime: number;
}

const PomodoroTimer = (props: Props): JSX.Element => {
  const [mainTime, setMaintime] = useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMaintime(mainTime - 1)
  }, 1000)

  return (
    <div className="pomodoro">
      <h2>You are working:</h2>
      <Timer mainTimer={mainTime} />
      <Button text="teste" />
    </div>
  )
}

export default PomodoroTimer