import React from 'react';
import PropTypes from 'prop-types';

export default function FormBottom({ changeQuestionCount, saveText }) {
  return (
    <>
      <button
        className="w-full mt-8 bg-indigo-500 px-4 py-2.5 text-white"
        onClick={changeQuestionCount}
      >
        Add New Question
      </button>

      <button className="w-full mt-8 bg-green-500 px-4 py-2.5 text-white" type="submit">
        {saveText}
      </button>
    </>
  );
}

FormBottom.propTypes = {
  changeQuestionCount: PropTypes.func,
  saveText: PropTypes.string,
};
