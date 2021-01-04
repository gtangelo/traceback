const ConvertTimestampToDay = (timestamp) => {
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

export default ConvertTimestampToDay;
