import { ADD_PLAYER, ADD_CALC, RESET_OLD_PLAYER, RESET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: 'Player',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case ADD_CALC:
    return {
      ...state,
      score: action.payload,
      assertions: state.assertions + 1,
    };
  case RESET_OLD_PLAYER:
    return {
      ...state,
      name: 'Player',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  case RESET_SCORE:
    return {
      ...state,
      assertions: 0,
      score: 0,
    };
  default:
    return state;
  }
}

export default player;
