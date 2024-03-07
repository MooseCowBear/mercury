export default copyObjectArr = (arr) => {
  const copy = arr.map((a) => {
    return { ...a };
  });
  return copy;
}