import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const useQuizStore = create(
  devtools(
    (set, get) => ({
      quizData: JSON.parse(localStorage.getItem('quizData')) ?? [],
      getSingleQuiz: (quizId) => {
        return get().quizData.filter((quiz) => {
          return quiz.id === quizId;
        });
      },
      setQuizData: (newState) => {
        set(() => ({
          quizData: newState,
        }));
      },
      createQuiz: (newState) => {
        const quizData = get().quizData;
        quizData.push(newState);
        localStorage.setItem('quizData', JSON.stringify(quizData));
        set(() => ({
          quizData,
        }));
      },
      updateQuiz: (newState) => {
        const quizData = get().quizData;
        const filteredQuiz = quizData.filter((quiz) => quiz.id !== newState.id);
        filteredQuiz.push(newState);
        localStorage.setItem('quizData', JSON.stringify(filteredQuiz));
        set(() => ({
          quizData: filteredQuiz,
        }));
      },
      deleteQuiz: (quizId) => {
        const quizData = get().quizData;
        const filteredQuiz = quizData.filter((quiz) => quiz.id !== quizId);
        localStorage.setItem('quizData', JSON.stringify(filteredQuiz));
        set(() => ({
          quizData: filteredQuiz,
        }));
      },
    }),
    'QuizStore',
  ),
);
