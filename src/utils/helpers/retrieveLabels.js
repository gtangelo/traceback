import axios from 'axios';

// API call to fetch all labels that is stored in dynamodb on AWS and then copies
// over in local state
const retrieveLabels = (setLabels) => {
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

export default retrieveLabels;