// File containing helper functions used throughout the react applications

// Converts the time in seconds to a proper time format string
export const ClockConverter = (totalSeconds) => {
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return `${hours} : ${minutes} : ${seconds}`;
};

// Converts a linux timestamp to its respective day
export const ConvertTimestampToDay = (timestamp) => {
  const taskDate = new Date(0);
  taskDate.setUTCSeconds(timestamp);
  taskDate.setHours(0, 0, 0, 0);
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  if (todayDate.getTime() === taskDate.getTime()) {
    return 'Today';
  } else if (yesterdayDate.getTime() === taskDate.getTime()) {
    return 'Yesterday';
  } else {
    return taskDate.toDateString();
  }
};


// Returns a css linear gradient attribute string given a hex colour code
export const GenerateLinearGradient = (colour) => {
  const rgb = [
    colour.substring(1, 3),
    colour.substring(3, 5),
    colour.substring(5, 7),
  ];
  const linearColour = `rgb(${rgb.map((c) => parseInt(c, 16) * 0.8).join()})`;
  return `linear-gradient(
      ${colour} 50%,
      ${linearColour} 100%
    );`;
};

// Returns the corresponding colour to a labelID
export const LabelIDToColour = (labels, labelID) => {
  let colour = '#eeeeee';
  labels.forEach((label) => {
    if (label.labelID === labelID) {
      colour = label.colour;
    }
  });
  return colour;
};

// Returns the corresponding name to a labelID
export const LabelIDToName = (labels, labelID) => {
  let name = 'None';
  labels.forEach((label) => {
    if (label.labelID === labelID) {
      name = label.name;
    }
  });
  return 'Category: ' + name;
};

// Splice array of tasks by date of when it was started
export const SpliceArrayByDay = (arr) => {
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
