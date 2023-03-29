export interface Quiz {
  id: number;
  score: number;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  result?: any;
}

export interface QuizAnswer {
  quizID: number;
  answer: string;
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
export const BACKEND_URL_QUIZ = 'http://localhost:3000';
