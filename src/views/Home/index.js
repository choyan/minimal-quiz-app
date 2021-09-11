import React from 'react';
import { useQuizStore } from 'store';
import { QuizCard } from 'shared';
import Layout from 'layout';

export default function Home() {
  const quizData = useQuizStore((state) => state.quizData);

  return (
    <Layout>
      {quizData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {quizData.map((quiz) => (
              <QuizCard quiz={quiz} />
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-3xl text-gray-900 text-center font-semibold">No Quiz Found</h2>
      )}
    </Layout>
  );
}
