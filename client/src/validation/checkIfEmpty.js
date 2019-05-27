const isEmpty = input =>
  input === undefined ||
  input === null ||
  (typeof input === 'object' && Object.keys(input).lenght === 0) ||
  (typeof value === 'string' && input.trim().length === 0);

  export default isEmpty;
