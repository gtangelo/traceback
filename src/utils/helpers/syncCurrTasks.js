/* global chrome */
import axios from "axios";
import retrieveCurrTasks from "./retrieveCurrTasks";

// Make a PUT request to update data in the dynamodb database

const syncCurrTasks = (setCurrTasks) => {
  chrome.storage.local.get(['currTasks'], ({ currTasks }) => {
    axios
      .put('/active-tasks/sync', {
        tasks_list: currTasks,
      })
      .then(() => {
        retrieveCurrTasks(setCurrTasks);
      })
      .catch((e) => console.log(e));
  })
};

export default syncCurrTasks;