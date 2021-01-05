import axios from 'axios';

// API call to fetch past task list that is stored in dynamodb on AWS and then copies
// over in local state
const retrievePastTasks = (setPastTasks) => {
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

export default retrievePastTasks;
