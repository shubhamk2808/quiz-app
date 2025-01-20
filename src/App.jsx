import './App.css'
import { QuizProvider } from "./context/QuizContext";
import Quiz from './components/Quiz'

function App() {
  return (
    <QuizProvider>
      <div className="w-full h-full">
        <Quiz />
      </div>
    </QuizProvider>
  )
}

export default App
