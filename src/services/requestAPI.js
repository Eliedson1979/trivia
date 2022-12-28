import { getStorage } from './localStorage';

export const requestTokenAPI = async () => {
  try {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL);
    const data = await response.json();
    return data.token;
  } catch (error) {
    return error;
  }
};

const setType = (type) => {
  if (type === 'True / False') return 'boolean';
  if (type === 'Multiple Choice') return 'multiple';
};

export const fetchGame = async (
  token,
  { category, difficulty, type, quantity } = JSON.parse(getStorage('options')),
) => {
  category = typeof category === 'string' ? '' : category;
  difficulty = difficulty.includes('Any') ? '' : difficulty.toLowerCase();
  type = type.includes('Any') ? '' : setType(type);

  const URL = `https://opentdb.com/api.php?amount=${quantity}&token=${token}&category=${category}&difficulty=${difficulty}&type=${type}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchCategories = async () => {
  try {
    const URL = 'https://opentdb.com/api_category.php';
    const response = await fetch(URL);
    const { trivia_categories: categories } = await response.json();
    return categories;
  } catch (error) {
    return error;
  }
};
