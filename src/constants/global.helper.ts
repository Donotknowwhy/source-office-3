export const getRandomColor = () => {
  const randomIndex = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomIndex;
};
