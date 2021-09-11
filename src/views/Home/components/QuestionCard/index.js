import PropTypes from 'prop-types';

export default function QuestionCard({ question, saveMultipleAnswer, saveSingleAnswer }) {
  return (
    <div className="rounded-md shadow-lg border border-gray-50 mt-4 p-3 text-sm">
      <h4 className="text-2xl mb-2">{question.question}</h4>
      <div>
        <ul>
          {question.answers.map((answer) => (
            <li className="my-2.5 flex items-center" key={answer.id}>
              <input
                type={question.answer_type === 'single' ? 'radio' : 'checkbox'}
                value={answer.id}
                name={question.id}
                id={answer.id}
                onChange={
                  question.answer_type === 'single'
                    ? (e) => saveSingleAnswer(e, question.id)
                    : (e) => saveMultipleAnswer(e, question.id)
                }
              />

              {question.question_type === 'text' ? (
                <span className="ml-3">{answer.text}</span>
              ) : (
                <label htmlFor={answer.id}>
                  <img className="h-40 w-40 ml-4" src={answer.text} alt={answer.text} />
                </label>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.object,
  saveMultipleAnswer: PropTypes.func,
  saveSingleAnswer: PropTypes.func,
};
