import { useState } from 'react'
import './App.css'
import React from 'react'
import Home from './components/Home'
import Questions from './components/Questions'

function App() {
  const [quiz, setQuiz] = useState(false)
  
  return (
    <div className="App bg-blue-50">
      {!quiz && <Home setQuiz={setQuiz} quiz={quiz}/>}
      {quiz && <Questions setQuiz={setQuiz} quiz={quiz} />}
    </div>
  )
}

export default App
