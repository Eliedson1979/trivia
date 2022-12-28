import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number, shape, string } from 'prop-types';
import {
  resetPlayer as resetPlayerAction,
  resetScore as resetScoreAction,
} from '../redux/actions';
import getPicture from '../helpers/defaultPicture';
import Header from '../components/Header';
import Score from '../components/Score';
import FeedbackMessage from '../components/FeedbackMessage';
import '../styles/Feedback.css';
import { saveStorage } from '../services/localStorage';

class Feedback extends Component {
  componentDidMount() {
    this.saveUserScore();
  }

  componentWillUnmount() {
    const { resetScore } = this.props;
    resetScore();
  }

  saveUserScore = () => {
    const { name, score, gravatarEmail } = this.props;
    const picture = getPicture(name, gravatarEmail);
    const data = {
      name,
      score,
      picture,
    };
    if (name && score !== 0) {
      // .sort((a, b) => b.score - a.score)
      const items = JSON.parse(localStorage.getItem('ranking') || '[]');
      const itemsSorted = items.concat(data);
      saveStorage('ranking', JSON.stringify(itemsSorted));
    }
  };

  handleClick = (route) => {
    const { history, resetPlayer } = this.props;
    if (route === '/') resetPlayer();
    history.push(route);
  };

  render() {
    return (
      <main>
        <Header hideScore homeBtn />
        <div className="feedback-container">
          <FeedbackMessage />
          <Score />
          <div className="feedback-buttons">
            <button
              type="button"
              onClick={ () => this.handleClick('/') }
              data-testid="btn-play-again"
              className="playBtn"
            >
              Play again
            </button>
            <button
              type="button"
              onClick={ () => this.handleClick('/ranking') }
              data-testid="btn-ranking"
              className="rankingBtn"
            >
              Ranking
            </button>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  resetPlayer: () => dispatch(resetPlayerAction()),
  resetScore: () => dispatch(resetScoreAction()),
});

Feedback.propTypes = {
  name: string.isRequired,
  score: number.isRequired,
  gravatarEmail: string.isRequired,
  history: shape({ push: func }).isRequired,
  resetPlayer: func.isRequired,
  resetScore: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
