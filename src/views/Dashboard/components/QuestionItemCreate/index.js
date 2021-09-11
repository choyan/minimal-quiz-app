import { useState } from 'react';
import PropTypes from 'prop-types';

export default function QuestionItemCreate({ register, watch, index, id }) {
  const [countAnswer, setCountAnswer] = useState(1);
  const maxAnswer = 5;
  const changeCountAnswer = () => {
    setCountAnswer((countAnswer) => countAnswer + 1);
  };

  const questionType = watch(`questionList[${index}].question_type`);
  const answerType = watch(`questionList[${index}].answer_type`);

  return (
    <div className="border border-gray-100 rounded-md shadow-md mt-8 p-6">
      <div>
        <label htmlFor="question-type" className="block text-sm font-medium text-gray-700">
          Question Type
        </label>
        <div className="mt-1">
          <select
            className="w-full"
            id="question-type"
            {...register(`questionList[${index}].question_type`, { required: true })}
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="answer-type" className="block text-sm font-medium text-gray-700">
          Answer Type
        </label>
        <div className="mt-1">
          <select
            className="w-full"
            id="answer-type"
            {...register(`questionList[${index}].answer_type`, { required: true })}
          >
            <option value="single">Single</option>
            <option value="multiple">Multiple</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={`question_${index}`} className="block text-sm font-medium text-gray-700">
          Question
        </label>
        <div className="mt-1">
          <input type="hidden" defaultValue={id} {...register(`questionList[${index}].id`)} />
          <input
            type="text"
            className="w-full"
            id={`question${index}`}
            {...register(`questionList[${index}].question`, { required: true })}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={`point_${index}`} className="block text-sm font-medium text-gray-700">
          Point
        </label>
        <div className="mt-1">
          <input
            type="number"
            className="w-full"
            id={`point_${index}`}
            {...register(`questionList[${index}].point`, { required: true })}
          />
        </div>
      </div>

      {[...Array(countAnswer)].map((question, answerIndex) => (
        <div className="mt-6" key={answerIndex}>
          <label
            htmlFor={`answer_${index}_${answerIndex}`}
            className="block text-sm font-medium text-gray-700"
          >
            Answer {answerIndex + 1}
          </label>
          <div className="mt-1 flex gap-x-6 items-center">
            {/* If answer option is greater than 1, then we will show the checkbox.
              it will also help us the save the corrent_answer in an array format.
             */}
            {countAnswer > 1 && (
              <>
                {answerType === 'single' ? (
                  <input
                    type="radio"
                    defaultValue={answerIndex + 1}
                    value={answerIndex + 1}
                    {...register(`questionList[${index}].correct_answer`)}
                  />
                ) : (
                  <input
                    type="checkbox"
                    defaultValue={answerIndex + 1}
                    value={answerIndex + 1}
                    {...register(`questionList[${index}].correct_answer`)}
                  />
                )}
              </>
            )}
            <input
              type="hidden"
              defaultValue={answerIndex + 1}
              {...register(`questionList[${index}].answers[${answerIndex}].id`)}
            />
            {questionType === 'image' ? (
              <input
                type="url"
                name="url"
                className="w-full"
                placeholder="https://example.com"
                pattern="https://.*"
                size="30"
                id={`answer_${index}_${answerIndex}`}
                {...register(`questionList[${index}].answers[${answerIndex}].text`, {
                  required: true,
                })}
              />
            ) : (
              <input
                type="text"
                className="w-full"
                id={`answer_${index}_${answerIndex}`}
                {...register(`questionList[${index}].answers[${answerIndex}].text`, {
                  required: true,
                })}
              />
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        {/*Only Accept upto 5 answer*/}
        {countAnswer < maxAnswer && (
          <div
            className="float-right mt-8 bg-indigo-500 px-3 py-1.5 text-sm cursor-pointer text-white"
            onClick={changeCountAnswer}
          >
            Add New Answer
          </div>
        )}
      </div>
    </div>
  );
}

QuestionItemCreate.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  register: PropTypes.func,
  watch: PropTypes.func,
};
