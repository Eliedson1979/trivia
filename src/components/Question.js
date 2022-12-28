import { decode } from 'he';
import { bool, func, number, string } from 'prop-types';
import React from 'react';

function Question({
  answer,
  index,
  btnIsDisable,
  click,
  correctAnswer,
  onClick,
}) {
  const setAnswerClass = () => {
    const correct = {
      backgroundColor: '#697a21',
      border: '3px solid #697a21',
      color: 'white',
    };
    const wrong = {
      backgroundColor: '#dd403a',
      border: '3px solid #dd403a',
      color: 'white',
    };
    if (answer === correctAnswer) return correct;
    return wrong;
  };

  return (
    <button
      key={ answer }
      type="button"
      name={ answer === correctAnswer ? 'correct' : 'wrong' }
      style={ click ? setAnswerClass() : {} }
      className="Answer-Btn"
      disabled={ btnIsDisable }
      data-testid={
        answer === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`
      }
      onClick={ onClick }
      value={ answer }
    >
      {decode(answer)}
    </button>
  );
}

Question.defaultProps = {
  answer: '',
  correctAnswer: '',
  btnIsDisable: false,
  click: false,
  index: 0,
};

Question.propTypes = {
  answer: string,
  correctAnswer: string,
  btnIsDisable: bool,
  click: bool,
  index: number,
  onClick: func.isRequired,
};

export default Question;
