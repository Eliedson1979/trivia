import { number } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Score extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <div className="score-info">
        <p id="total-question" data-testid="feedback-total-question">
          {assertions === 1 ? '1 Right answer' : `${assertions} Right answers`}
        </p>
        <p className="total-score" data-testid="feedback-total-score">
          {score}
          {' '}
          Points
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Score.propTypes = {
  assertions: number.isRequired,
  score: number.isRequired,
};

export default connect(mapStateToProps)(Score);
