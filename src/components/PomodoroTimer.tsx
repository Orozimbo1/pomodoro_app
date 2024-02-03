import { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { secondsToTime } from "../utils/secondsToTime";

interface Props {
  defaultPomodoroTime: number;
}

const PomodoroTimer = (props: Props): JSX.Element => {
  const [mainTime, setMaintime] = useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMaintime(mainTime - 1)
  }, 1000)

  return (
    <div style={{fontSize: 50, marginLeft: 500}}>{secondsToTime(mainTime)}</div>
  )
}

export default PomodoroTimer