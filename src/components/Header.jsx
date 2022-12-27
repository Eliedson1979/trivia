import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const picturePlayer = md5(gravatarEmail).toString();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${picturePlayer}` }
          alt={ name }
        />
        <div className="player-info">
          <p>
            Nome:
            { ' ' }
            <span data-testid="header-player-name">{ name }</span>
          </p>
          <p>
            Pontuação:
            { ' ' }
            <span data-testid="header-score">{ score }</span>
          </p>
        </div>
        <img src={ logo } className="header-logo" alt="logo" />
      </header>

    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
