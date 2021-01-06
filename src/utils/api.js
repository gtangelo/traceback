/* global chrome */
import axios from 'axios';

// File container helper functions for http calls to Amazon API Gateway

// API call to fetch task list that is stored in dynamodb on AWS and then copies
// over in local state
export const retrieveCurrTasks = (setCurrTasks) => {
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
      chrome.storage.local.set({ currTasks: tasksList });
    })
    .catch((e) => console.log(e));
};

// API call to fetch all labels that is stored in dynamodb on AWS and then copies
// over in local state
export const retrieveLabels = (setLabels) => {
  axios
    .get('/labels/retrieve', {
      params: {
        userID: 1,
      },
    })
    .then(({ data }) => {
      const labels = data['labels'];
      setLabels(labels);
    })
    .catch((e) => console.log(e));
};

// API call to fetch past task list that is stored in dynamodb on AWS and then copies
// over in local state
export const retrievePastTasks = (setPastTasks) => {
  axios
    .get('/inactive-tasks/retrieve', {
      params: {
        userID: 1,
      },
    })
    .then(({ data }) => {
      const tasksList = data['tasks_list'].sort((a, b) => b['start'] - a['start']);
      setPastTasks(tasksList);
    })
    .catch((e) => console.log(e));
};

// Make a PUT request to update all tasks data in the dynamodb database
export const syncCurrTasks = (setCurrTasks) => {
  chrome.storage.local.get(['currTasks'], ({ currTasks }) => {
    axios
      .put('/active-tasks/sync', {
        tasks_list: currTasks,
      })
      .then(() => {
        retrieveCurrTasks(setCurrTasks);
      })
      .catch((e) => console.log(e));
  });
};

// Make a PUT request to update a single task data in the dynamodb database
export const updateTaskDatabase = (userID, taskID, time) => {
  axios
    .put('/active-task/update', {
      userID: userID,
      taskID: taskID,
      time: time,
    })
    .catch((e) => console.log(e));
};
