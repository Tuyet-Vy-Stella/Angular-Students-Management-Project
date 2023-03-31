export type ResultExam = {
  isCorrect: boolean;
  isCurrentChoose: CurrentChoose;
};

export type CurrentChoose = {
  allAnswer: string[];
  answer: string;
  quizID: number;
  score: number;
  isChoose: boolean;
};

export interface Quiz {
  id: number;
  score: number;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  allAnswers: string[];
  result?: ResultExam;
}
export interface QuizAnswer {
  quizID: number;
  answer: string;
  score: number;
  isChoose: boolean;
}

export interface Mark {
  student_id: number;
  subject_id: number;
  mark: number;
  semester: number;
}

export function shuffle(array: any) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
export const BACKEND_URL_QUIZ = 'https://json-server-quiz.vercel.app';

export const markAPI = 'https://qlsv-mu.vercel.app/api/mark';
