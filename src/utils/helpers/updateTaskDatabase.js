/*
  This function updates task information in the dynamodb database on AWS
  using the fetch API to match with the current local state of the task
  (i.e. time counter).
*/

import axios from "axios";
// import { URL } from "globals";

const URL = 'https://ich7sma0mc.execute-api.us-east-2.amazonaws.com';

const updateTaskDatabase = (userID, taskID, time) => {
  axios.put(
    URL + '/active-task/update', {
      userID: userID,
      taskID: taskID,
      time: time
    }
  )
    .catch((e) => console.log(e));
};

export default updateTaskDatabase;