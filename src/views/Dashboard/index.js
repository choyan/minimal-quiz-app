import { useQuizStore } from 'store';
import { QuizItem } from './components';
import { Link } from 'react-router-dom';
import Layout from 'layout';

export default function Dashboard() {
  const [quizData, deleteQuiz] = useQuizStore((state) => [state.quizData, state.deleteQuiz]);

  const confirmDelete = (id) => {
    deleteQuiz(id);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-center">Dashboard</h1>
        <Link
          to="/dashboard/create-quiz"
          className="bg-green-400 text-white text-sm font-semibold px-3 py-1.5 rounded-md"
        >
          <span>Create Quiz</span>
        </Link>
      </div>

      <div className="mt-8">
        {quizData.length > 0 ? (
          quizData.map((quiz) => <QuizItem quiz={quiz} confirmDelete={confirmDelete} />)
        ) : (
          <div>
            <h2 className="text-3xl text-gray-900 text-center font-semibold">No Quiz Found</h2>
          </div>
        )}
      </div>
    </Layout>
  );
}
