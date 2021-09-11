import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function QuestionCard({ quiz }) {
  return (
    <Link to={`quiz/${quiz.id}`} className="block" key={quiz.id}>
      <div className="h-full relative overflow-y-hidden">
        <img src={quiz.cover} alt={quiz.name} />
        <div className="absolute bottom-0 w-full flex items-center p-2 h-20 bg-gray-700 bg-opacity-80">
          <h1 className="text-lg text-white">{quiz.name}</h1>
        </div>
      </div>
    </Link>
  );
}

QuestionCard.propTypes = {
  quiz: PropTypes.object,
};
