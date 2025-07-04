export interface Flashcard {
  id: string;
  hebrew: string;
  transcription: string;
  translation: string;
}

export type QuestionType = 'hebrew' | 'transcription' | 'translation';

export interface FlashcardQuestion {
  questionType: QuestionType;
  question: string;
  answer1: string;
  answer2: string;
} 