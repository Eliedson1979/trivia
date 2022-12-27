import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { newScore } from '../redux/actions';
import '../styles/Feedback.css';

class Feedback extends Component {
  componentDidMount() {
    this.setPlayerInfo();
  }

  setPlayerInfo = () => {
    const { name, score, gravatarEmail } = this.props;
    const playerInfo = {
      name,
      score,
      gravatarEmail,
    };

    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', '[]');
    }

    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const newRanking = [...ranking, playerInfo];

    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  routeLogin = () => {
    const { history, newGameScore } = this.props;
    newGameScore();
    history.push('/');
  }

  routeRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    const positiveFeedback = 'Well Done!';
    const negativeFeedback = 'Could be better...';
    const threshold = 3;
    return (
      <>
        <Header />
        <p data-testid="feedback-text" className="text">
          { assertions >= threshold ? positiveFeedback : negativeFeedback }
        </p>
        <p className="text">
          Placar final:
          { ' ' }
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
        <p className="text">
          Total de acertos:
          { ' ' }
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
        <div className="divBtn">
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.routeLogin }
            className="btnFeedback"
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.routeRanking }
            className="btnFeedback"
          >
            Ranking
          </button>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  newGameScore: () => dispatch(newScore()),
});

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
