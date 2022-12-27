import { GET_INFO_PLAYER, GET_PICTURE,
  NEW_SCORE,
  UPDATE_ASSERTIONS, UPDATE_SCORE } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '', // nome - da - pessoa,
  assertions: 0, // número - de - acertos,
  score: 0, // pontuação,
  gravatarEmail: '', // email - da - pessoa,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_INFO_PLAYER:
    return {
      ...state,
      name: action.name,
    };
  case GET_PICTURE:
    return {
      ...state,
      gravatarEmail: action.gravatarEmail,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case UPDATE_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case NEW_SCORE:
    return {
      ...state,
      score: 0,
    };
  default:
    return state;
  }
};

export default player;
