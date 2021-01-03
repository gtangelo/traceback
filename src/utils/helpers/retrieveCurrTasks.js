/* global chrome */
import axios from 'axios';

// API call to fetch task list that is stored in dynamodb on AWS and then copies
// over in local state
const retrieveCurrTasks = (setCurrTasks) => {
  axios
    .get('/active-tasks/retrieve', {
      params: {
        userID: 1,
      },
    })
    .then(({ data }) => {
      const tasksList = data['tasks_list'].sort(
        (a, b) => b['start'] - a['start']
      );
      setCurrTasks(tasksList);
      chrome.storage.sync.set({ currTasks: tasksList });
    })
    .catch((e) => console.log(e));
};

export default retrieveCurrTasks;
