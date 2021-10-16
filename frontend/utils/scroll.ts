export const scrollTo = (top = 0, left = 0): void => {
  window.scrollTo({
    top,
    left,
    behavior: 'smooth',
  });
};
