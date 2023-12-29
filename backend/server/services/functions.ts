export const sliceByNumber = <T>(
  array: Array<T>,
  number: number,
): Array<Array<T>> => {
  const length = Math.ceil(array.length / number);

  return new Array(length)
    .fill('')
    .map((_, i) => array.slice(i * number, (i + 1) * number));
};
