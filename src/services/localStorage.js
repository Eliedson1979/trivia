export const saveStorage = (key, item) => {
  localStorage.setItem(key, item);
};

export const getStorage = (key) => {
  const data = localStorage.getItem(key);
  return data;
};

if (!getStorage('options')) {
  saveStorage('options', JSON.stringify({
    category: 'Any category',
    difficulty: 'Any difficulty',
    type: 'Any Type',
    quantity: '10',
  }));
}
