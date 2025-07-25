import { useState } from 'react';
import type { FlashcardQuestion } from '../types/flashcard';
import { getQuestionTypeLabel } from '../utils/flashcardUtils';
import './Flashcard.css';

interface FlashcardProps {
  question: FlashcardQuestion;
  onNext: () => void;
}

export function Flashcard({ question, onNext }: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Set<'answer1' | 'answer2'>>(new Set());

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    setShowAnswer(false);
    setSelectedAnswers(new Set());
    onNext();
  };

  const handleAnswerClick = (answer: 'answer1' | 'answer2') => {
    setSelectedAnswers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(answer)) {
        newSet.delete(answer);
      } else {
        newSet.add(answer);
      }
      return newSet;
    });
  };

  return (
    <div className="flashcard">
      <div className="flashcard-header">
        <span className="question-type">{getQuestionTypeLabel(question.questionType)}</span>
      </div>
      
      <div className="flashcard-question">
        <h2>{question.question}</h2>
      </div>

      {!showAnswer ? (
        <div className="flashcard-actions">
          <button 
            className="show-answer-btn"
            onClick={handleShowAnswer}
          >
            Показать ответ
          </button>
        </div>
      ) : (
        <div className="flashcard-answers">
          <div className="answers-container">
            <button
              className={`answer-btn ${selectedAnswers.has('answer1') ? 'selected' : ''}`}
              onClick={() => handleAnswerClick('answer1')}
            >
              {question.answer1}
            </button>
            <button
              className={`answer-btn ${selectedAnswers.has('answer2') ? 'selected' : ''}`}
              onClick={() => handleAnswerClick('answer2')}
            >
              {question.answer2}
            </button>
          </div>
          
          <div className="flashcard-actions">
            <button 
              className="next-btn"
              onClick={handleNext}
            >
              Следующая карточка
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 