import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function QuizItem({ quiz, confirmDelete }) {
  return (
    <div className="flex items-center justify-between p-4 border-2 border-gray-100 shadow-sm mt-4 rounded-md">
      <div>{quiz.name}</div>

      <div className="flex items-center">
        <Link to={`/dashboard/quiz/${quiz.id}/edit`}>
          <div className="cursor-pointer">
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M16.757 3l-2 2H5v14h14V9.243l2-2V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12.757zm3.728-.9L21.9 3.516l-9.192 9.192-1.412.003-.002-1.417L20.485 2.1z" />
            </svg>
          </div>
        </Link>

        <div className="cursor-pointer" onClick={() => confirmDelete(quiz.id)}>
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

QuizItem.propTypes = {
  confirmDelete: PropTypes.func,
  quiz: PropTypes.object,
};
