const SpliceArrayByDay = (arr) => {
  let newArr = [];
  let i = 0;
  while (i < arr.length) {
    let temp = [];
    temp.push(arr[i]);
    let j = i + 1;
    while (j < arr.length) {
      let taskDate = new Date(0);
      taskDate.setUTCSeconds(temp[0]['start']);
      taskDate.setHours(0, 0, 0, 0);
      let d = new Date(0);
      d.setUTCSeconds(arr[j]['start']);
      d.setHours(0, 0, 0, 0);
      if (taskDate.getTime() === d.getTime()) {
        temp.push(arr[j]);
      } else {
        break;
      }
      j++;
    }
    newArr.push(temp);
    i = j;
  }
  return newArr;
};

export default SpliceArrayByDay;
