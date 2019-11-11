export const selectRandomIndexFromList = data => {
  return Math.floor(Math.random() * data.length - 0.001);
};
