import { useState } from 'react';
import PropTypes from 'prop-types';
import QuestionCard from '../QuestionCard';
import { isEqual } from 'lodash/lang';
import ModalFinalPoint from 'shared/ModalFinalPoint';

export default function FullPageView({ questionList }) {
  const [answerSet, setAnswerSet] = useState([]);
  const [point, setPoint] = useState(0);
  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);

  const closeModal = () => {
    setIsFinalModalOpen(false);
  };

  const openModal = () => {
    setIsFinalModalOpen(true);
  };

  const saveSingleAnswer = (e, questionId) => {
    const data = {
      questionId,
      answer: e.target.value,
    };
    const answerExist = answerSet.filter((answer) => answer.questionId === questionId);

    if (answerExist.length !== 0) {
      setAnswerSet(answerSet.filter((answer) => answer.questionId !== questionId));
    }
    setAnswerSet((answerSet) => [...answerSet, data]);
  };

  const saveMultipleAnswer = (e, questionId) => {
    const answerExist = answerSet.filter((answer) => answer.questionId === questionId);

    if (answerExist.length > 0) {
      setAnswerSet(answerSet.filter((answer) => answer.questionId !== questionId));
      let answers = answerExist[0].answer;
      if (e.target.checked) {
        answers.push(e.target.value);
      } else {
        answers = answers.filter((item) => item !== e.target.value);
      }
      const data = {
        questionId,
        answer: answers.sort(),
      };
      setAnswerSet((answerSet) => [...answerSet, data]);
    } else {
      const data = {
        questionId,
        answer: [e.target.value],
      };
      setAnswerSet((answerSet) => [...answerSet, data]);
    }
  };

  const calculateResult = () => {
    questionList.forEach((question) => {
      answerSet.forEach((answer) => {
        if (answer.questionId === question.id) {
          console.log(question.correct_answer, answer.answer);
          if (isEqual(answer.answer, question.correct_answer)) {
            setPoint((point) => point + parseInt(question.point));
          }
        }
      });
    });

    openModal();
  };

  return (
    <div className="mt-4 p-3">
      {questionList.map((question) => (
        <QuestionCard
          question={question}
          key={question.id}
          saveSingleAnswer={saveSingleAnswer}
          saveMultipleAnswer={saveMultipleAnswer}
        />
      ))}

      <div className="mt-6 flex justify-center">
        <button
          className="bg-indigo-500 px-4 py-2.5 rounded-md text-white disabled:bg-indigo-300 disabled:opacity-50 "
          onClick={calculateResult}
          disabled={point !== 0}
        >
          Calculate Result
        </button>
      </div>

      <ModalFinalPoint point={point} closeModal={closeModal} isOpen={isFinalModalOpen} />
    </div>
  );
}

FullPageView.propTypes = {
  questionList: PropTypes.array,
};
