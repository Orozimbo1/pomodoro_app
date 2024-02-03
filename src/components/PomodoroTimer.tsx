import { useState } from "react";
import { useInterval } from "../hooks/useInterval";

interface Props {
  defaultPomodoroTime: number;
}

const PomodoroTimer = (props: Props): JSX.Element => {
  const [mainTime, setMaintime] = useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMaintime(mainTime - 1)
  }, 1000)

  return (
    <div>{mainTime}</div>
  )
}

export default PomodoroTimer