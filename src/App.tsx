import './App.css'
import PomodoroTimer from './components/PomodoroTimer.jsx'

function App(): JSX.Element {

  return (
    <div className='container'>
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    </div>
  )
}

export default App
