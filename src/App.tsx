import { useState, useEffect } from 'react'
import { Flashcard } from './components/Flashcard'
import { flashcards } from './data/flashcards'
import { generateRandomQuestion } from './utils/flashcardUtils'
import type { FlashcardQuestion } from './types/flashcard'
import './App.css'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState<FlashcardQuestion | null>(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)

  const generateNewQuestion = () => {
    const randomFlashcard = flashcards[Math.floor(Math.random() * flashcards.length)]
    const question = generateRandomQuestion(randomFlashcard)
    setCurrentQuestion(question)
    setTotalQuestions(prev => prev + 1)
  }

  useEffect(() => {
    generateNewQuestion()
  }, [])

  const handleNext = () => {
    generateNewQuestion()
  }

  if (!currentQuestion) {
    return <div className="loading">Загрузка...</div>
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Иврит Карточки</h1>
        <div className="stats">
          <span>Карточка: {totalQuestions}</span>
        </div>
      </header>
      
      <main className="app-main">
        <Flashcard 
          question={currentQuestion} 
          onNext={handleNext}
        />
      </main>
      
      <footer className="app-footer">
        <p>Изучайте иврит с помощью карточек!</p>
      </footer>
    </div>
  )
}

export default App
