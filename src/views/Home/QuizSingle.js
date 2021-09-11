import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuizStore } from 'store';
import FullPageView from './components/FullPageView';
import Layout from 'layout';

export default function QuizSingle() {
  const { quizId } = useParams();
  const getSingleQuiz = useQuizStore((state) => state.getSingleQuiz);
  const quiz = getSingleQuiz(quizId)[0];

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">{quiz.name}</h1>
      {quiz.layout === 'all' ? <FullPageView questionList={quiz.questionList} /> : 'separate'}
    </Layout>
  );
}
