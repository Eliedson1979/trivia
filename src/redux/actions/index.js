export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_CALC = 'ADD_CALC';
export const NEW_CATEGORY = 'NEW_CATEGORY';
export const RESET_OLD_PLAYER = 'RESET_OLD_PLAYER';
export const RESET_SCORE = 'RESET_SCORE';

export const addPlayer = (payload) => ({
  type: ADD_PLAYER,
  payload,
});

export const addCalc = (payload) => ({
  type: ADD_CALC,
  payload,
});

export const changeCategory = (payload) => ({
  type: NEW_CATEGORY,
  payload,
});

export const resetPlayer = () => ({
  type: RESET_OLD_PLAYER,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});
