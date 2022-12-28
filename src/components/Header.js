import React from 'react';
import { bool, number, string } from 'prop-types';
import { FaHome } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import getPicture from '../helpers/defaultPicture';
import '../styles/Header.css';

function Header({ email, name, score, hideScore, homeBtn }) {
  const history = useHistory();
  return (
    <header className="header-game">
      {!hideScore && (
        <div className="Score-Container">
          <p data-testid="header-score">{score}</p>
        </div>
      )}
      {homeBtn && (
        <button
          type="button"
          className="home-button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
          alt="House Icon"
        >
          <FaHome />
        </button>
      )}
      <div className="Player-Container">
        <p data-testid="header-player-name">{name}</p>
        <img
          src={ getPicture(name, email) }
          alt={ name }
          data-testid="header-profile-picture"
        />
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.defaultProps = {
  email: '',
  name: '',
  score: 0,
  hideScore: false,
  homeBtn: false,
};

Header.propTypes = {
  email: string,
  name: string,
  score: number,
  hideScore: bool,
  homeBtn: bool,
};

export default connect(mapStateToProps)(Header);
