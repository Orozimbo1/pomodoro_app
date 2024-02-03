import './App.css'
import PomodoroTimer from './components/PomodoroTimer.jsx'

function App(): JSX.Element {

  return (
    <>
      <h1>Ola</h1>
      <PomodoroTimer
        defaultPomodoroTime={1500}
      />
    </>
  )
}

export default App
