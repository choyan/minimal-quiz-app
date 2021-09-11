import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactSortable } from 'react-sortablejs';
import { nanoid } from 'nanoid';
import { useHistory } from 'react-router-dom';
import { useQuizStore } from 'store';
import { checkSingleAnswers } from 'utils';
import Layout from 'layout';
import { FormBottom, QuestionItemCreate, QuizPrimaryInformation } from './components';

export default function QuizCreate() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [questionCount, setQuestionCount] = useState([]);
  const createQuiz = useQuizStore((state) => state.createQuiz);
  const questionList = watch('questionList');
  const history = useHistory();

  const changeQuestionCount = () => {
    setQuestionCount((questionCount) => [...questionCount, { id: nanoid() }]);
  };

  const onSubmit = (data) => {
    // Check before saving data
    if (!data.questionList) {
      alert('You must have at least one question in the quiz');
    } else {
      if (checkSingleAnswers(data.questionList)) {
        alert('You have a question with only a single answer in your list');
      } else {
        createQuiz(data);
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

  return (
    <Layout>
      <h1 className="text-xl">Quiz Create Form</h1>
      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <QuizPrimaryInformation register={register} />

          <ReactSortable list={questionCount} setList={onDropEnd}>
            {questionCount.map((question, index) => (
              <QuestionItemCreate
                key={question.id}
                register={register}
                index={index}
                id={question.id}
                watch={watch}
                setValue={setValue}
              />
            ))}
          </ReactSortable>

          <FormBottom changeQuestionCount={changeQuestionCount} saveText="Save Quiz" />
        </form>
      </div>
    </Layout>
  );
}
