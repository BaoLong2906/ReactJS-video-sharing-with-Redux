let removeItemInArrayByValue = (array, value) => {
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1); // 2nd parameter means remove one item only
  }
  return array;
}

export default removeItemInArrayByValue;