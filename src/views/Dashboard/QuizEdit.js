import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactSortable } from 'react-sortablejs';
import { useHistory, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { useQuizStore } from 'store';
import { checkSingleAnswers } from 'utils';
import Layout from 'layout';
import { FormBottom, QuestionItemEdit, QuizPrimaryInformation } from './components';

export default function QuizEdit() {
  const { register, handleSubmit, watch, setValue, reset } = useForm();
  const { id } = useParams();
  const [questionCount, setQuestionCount] = useState([]);
  const updateQuiz = useQuizStore((state) => state.updateQuiz);
  const questionList = watch('questionList');
  const getSingleQuiz = useQuizStore((state) => state.getSingleQuiz);
  const quiz = getSingleQuiz(id)[0];
  const history = useHistory();

  const changeQuestionCount = () => {
    setQuestionCount((questionCount) => [...questionCount, { id: nanoid() }]);
  };

  const onSubmit = (data) => {
    if (!data.questionList) {
      alert('You must have at least one question in the quiz');
    } else {
      if (checkSingleAnswers(data.questionList)) {
        alert('You have a question with only a single answer in your list');
      } else {
        updateQuiz(data);
        history.push('/dashboard');
      }
    }
  };

  const onDropEnd = (newCountState) => {
    setQuestionCount(newCountState);
    let newQuestionOrder = questionList?.sort((a, b) => {
      return (
        questionCount.findIndex((p) => p.id === a.id) -
        questionCount.findIndex((p) => p.id === b.id)
      );
    });
    if (newQuestionOrder) {
      setValue('questionList', newQuestionOrder);
    }
  };

  useEffect(() => {
    reset(quiz);
    const quizIds = quiz.questionList.map((question) => question.id);
    quizIds.forEach((id) => {
      setQuestionCount((questionCount) => [
        ...questionCount,
        {
          id,
        },
      ]);
    });
  }, [quiz]);

  return (
    <Layout>
      <h1 className="text-xl">Quiz Update Form</h1>
      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <QuizPrimaryInformation register={register} />

          <ReactSortable list={questionCount} setList={onDropEnd}>
            {questionCount.map((question, index) => (
              <QuestionItemEdit
                key={question.id}
                register={register}
                index={index}
                id={question.id}
                watch={watch}
              />
            ))}
          </ReactSortable>

          <FormBottom changeQuestionCount={changeQuestionCount} saveText="Update Quiz" />
        </form>
      </div>
    </Layout>
  );
}
