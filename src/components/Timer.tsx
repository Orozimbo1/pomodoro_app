import { secondsToTime } from "../utils/secondsToTime";

interface Props {
  mainTimer: number;
}

const Timer = (props: Props): JSX.Element => {
  return (
    <div className="timer">{secondsToTime(props.mainTimer)}</div>
  )
}

export default Timer