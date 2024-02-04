import { secondsToMinute } from "../utils/secondsToMinute";

interface Props {
  mainTimer: number;
}

const Timer = (props: Props): JSX.Element => {
  return (
    <div className="timer">{secondsToMinute(props.mainTimer)}</div>
  )
}

export default Timer