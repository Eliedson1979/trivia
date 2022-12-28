import React, { Component } from 'react';
import { HiClock } from 'react-icons/hi';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { decode } from 'he';
import { func, number, shape } from 'prop-types';
import { connect } from 'react-redux';
import { getStorage } from '../services/localStorage';
import { fetchGame } from '../services/requestAPI';
import { addCalc } from '../redux/actions';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../styles/QuestionsStyle.css';
import '../styles/Game.css';
import Question from '../components/Question';

const INITIAL_STATE = {
  gameQuestions: [],
  gameCategory: '',
  questionName: '',
  questionNumber: 0,
  answers: [],
  correctAnswer: '',
  questionDifficulty: '',
  userAnswer: '',
  btnIsDisable: false,
  seconds: 30,
  click: false,
  isFetching: true,
};

class Game extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.setGame();
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  handleClick = ({ target: { name, value } }) => {
    this.setState(
      { btnIsDisable: true, click: true, userAnswer: value },
      () => {
        const { questionDifficulty } = this.state;
        if (name === 'correct') this.calculateScore(questionDifficulty);
        clearInterval(this.timerId);
      },
    );
  };

  redirectTo = (route) => {
    const { history } = this.props;
    history.push(route);
  };

  setGame = async () => {
    const ERROR_CODE = 3;
    const response = await fetchGame(getStorage('token'));
    if (response.response_code === ERROR_CODE) {
      localStorage.removeItem('token');
      this.redirectTo('/');
    } else {
      this.setState({ gameQuestions: response.results });
      this.setNewQuestion();
      this.countDownTimer();
      this.setState({ isFetching: false });
    }
  };

  nextQuestion = () => {
    const { questionNumber } = this.state;
    const maxQuestions = JSON.parse(getStorage('options')).quantity;
    if (questionNumber === maxQuestions - 1) {
      this.redirectTo('/feedback');
    } else {
      this.setState(
        (pastState) => ({
          userAnswer: '',
          questionNumber: pastState.questionNumber + 1,
          btnIsDisable: false,
          click: false,
        }),
        () => {
          this.setNewQuestion();
          this.setState({ seconds: 30, btnIsDisable: false });
          this.countDownTimer();
        },
      );
    }
  };

  setNewQuestion = () => {
    const { questionNumber, gameQuestions } = this.state;
    const answers = this.setGameAnswers(gameQuestions[questionNumber]);
    this.setState({
      questionDifficulty: gameQuestions[questionNumber].difficulty,
      gameCategory: gameQuestions[questionNumber].category,
      questionName: gameQuestions[questionNumber].question,
      correctAnswer: gameQuestions[questionNumber].correct_answer,
      answers,
    });
  };

  setGameAnswers = (question) => {
    const { correct_answer: correct, incorrect_answers: wrongs } = question;
    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    const VALUE_BETWEEN = 0.5;
    return [...wrongs, correct].sort(() => Math.random() - VALUE_BETWEEN);
  };

  calculateScore = (difficulty) => {
    const { seconds } = this.state;
    const { score, addCalcDispatch } = this.props;
    const TEN = 10;
    const THREE = 3;
    if (difficulty === 'easy') addCalcDispatch(score + TEN + seconds * 1);
    if (difficulty === 'medium') addCalcDispatch(score + TEN + seconds * 2);
    if (difficulty === 'hard') addCalcDispatch(score + TEN + seconds * THREE);
  };

  countDownTimer = () => {
    const ONE_SECOND = 1000;
    this.timerId = setInterval(() => {
      const { seconds, click } = this.state;
      if (click || seconds === 0) {
        clearInterval(this.timerId);
        return this.setState({ btnIsDisable: true, click: true });
      }
      return this.setState((past) => ({ seconds: past.seconds - 1 }));
    }, ONE_SECOND);
  };

  render() {
    const {
      isFetching, gameCategory, questionName,
      answers, correctAnswer, btnIsDisable,
      click, questionDifficulty, seconds, userAnswer,
    } = this.state;
    return (
      <main className="Game-Container">
        {isFetching ? (<Loading />) : (
          <>
            <Header />
            <section className="Game">
              <div className="Informations-Container">
                <div className="Timer">
                  <HiClock />
                  <p>{seconds}</p>
                </div>
                <div className="Difficulty">
                  <RiCheckboxBlankCircleFill className={ questionDifficulty } />
                </div>
                <div className="Game-Question">
                  <h3 data-testid="question-category">{gameCategory}</h3>
                  <h1 data-testid="question-text">{decode(questionName)}</h1>
                </div>
              </div>
              <div className="Answers-Container" data-testid="answer-options">
                <div className={ `Answer-Result ${click ? 'Visible' : 'Hide'}` }>
                  {userAnswer === correctAnswer ? (
                    <FaCheckCircle className="easy" />
                  ) : (
                    <FaTimesCircle className="hard" />
                  )}
                </div>
                {answers.map((answer, index) => (
                  <Question
                    key={ answer }
                    answer={ answer }
                    index={ index }
                    click={ click }
                    btnIsDisable={ btnIsDisable }
                    correctAnswer={ correctAnswer }
                    onClick={ this.handleClick }
                  />
                ))}
              </div>
              <div
                className={ `Next-BtnContainer ${click ? 'Visible' : 'Hide'}` }
              >
                {click && (
                  <button
                    type="button"
                    name="next"
                    className="Next-Button"
                    data-testid="btn-next"
                    onClick={ this.nextQuestion }
                  >
                    Next
                  </button>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    );
  }
}

Game.propTypes = {
  history: shape({ push: func }).isRequired,
  addCalcDispatch: func.isRequired,
  score: number.isRequired,
};

const mapStateToProps = (state) => ({ score: state.player.score });

const mapDispatchToProps = (dispatch) => ({
  addCalcDispatch: (calc) => dispatch(addCalc(calc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
