import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { AiFillSetting } from 'react-icons/ai';
import { getInfoPlayer, getPicture } from '../redux/actions';
import logo from '../trivia.png';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      player: '',
      email: '',
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  routeGame = async () => {
    const { player, email } = this.state;
    const { dispatchGetInfoPlayer, dispatchGetPicture } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();

    localStorage.setItem('token', json.token);

    const { history } = this.props;
    history.push('/game');
    dispatchGetInfoPlayer(player);
    dispatchGetPicture(email);
  }

  routeSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { player, email } = this.state;
    return (
      <div className="login-page">
        <img src={ logo } className="App-logo" alt="logo" />
        <form className="login-form">
          <input
            type="text"
            data-testid="input-player-name"
            placeholder="Nome"
            onChange={ this.handleInputChange }
            name="player"
            value={ player }
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            placeholder="E-mail"
            onChange={ this.handleInputChange }
            name="email"
            value={ email }
          />
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.routeGame }
            disabled={ !(player && email) }
            className="play-btn"
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.routeSettings }
            className="settings-btn"
          >
            <AiFillSetting />
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchGetInfoPlayer: PropTypes.func.isRequired,
  dispatchGetPicture: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchGetInfoPlayer: (name) => dispatch(getInfoPlayer(name)),
  dispatchGetPicture: (email) => dispatch(getPicture(email)),
});

export default connect(null, mapDispatchToProps)(Login);
