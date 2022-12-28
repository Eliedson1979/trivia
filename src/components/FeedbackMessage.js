import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackMessage extends Component {
  state = {
    idChange: false,
  }

  componentDidMount = () => {
    const NUMBER_OF_ASSERTIONS = 3;
    const { assertions } = this.props;
    if (assertions >= NUMBER_OF_ASSERTIONS) {
      this.setState({ idChange: true });
    }
  }

  handlerMessage = () => {
    const NUMBER_OF_ASSERTIONS = 3;
    const { assertions } = this.props;
    return assertions >= NUMBER_OF_ASSERTIONS
      ? 'Well Done!'
      : 'Could be better...';
  };

  render() {
    const { idChange } = this.state;
    return (
      <div>
        <p
          className={ idChange ? 'goodMessage' : 'badMessage' }
          data-testid="feedback-text"
        >
          { this.handlerMessage() }

        </p>
      </div>
    );
  }
}

FeedbackMessage.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(FeedbackMessage);
