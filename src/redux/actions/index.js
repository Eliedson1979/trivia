import { GET_INFO_PLAYER, GET_PICTURE,
  NEW_SCORE, UPDATE_ASSERTIONS, UPDATE_SCORE } from './actionTypes';

export const getInfoPlayer = (name) => ({
  type: GET_INFO_PLAYER,
  name,
});

export const getPicture = (gravatarEmail) => ({
  type: GET_PICTURE,
  gravatarEmail,
});

export const updateScore = (score) => ({ type: UPDATE_SCORE, score });

export const updateAssertions = () => ({ type: UPDATE_ASSERTIONS });

export const newScore = () => ({ type: NEW_SCORE });
