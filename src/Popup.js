import { useState, useEffect, useRef } from 'react';
import { CURRENT_TASK_TAB, PAST_TASK_TAB, URL } from './globals';
import Navbar from 'components/Navbar/';
import PastTaskScreen from 'tabs/PastTask/';
import CurrTaskScreen from 'tabs/CurrTask/';
import './Popup.css'
import useInterval from 'utils/useInterval';
import updateTaskDatabase from 'utils/updateTaskDatabase';
import axios from 'axios';

const Popup = () => {
  const [currPage, setCurrPage] = useState(CURRENT_TASK_TAB);
  const [totalTime, setTotalTime] = useState(0);
  const [pastTasksList, setPastTasksList] = useState([]);
  const [currTasksList, setCurrTasksList] = useState([]);
  const [labels, setLabels] = useState([]);

  // API call to fetch task list that is stored in dynamodb on AWS and then copies
  // over in local state
  const fetchCurrTasksList = () => {
    axios
      .get(
        URL + 'active-tasks/retrieve',
        {
          params: {
            userID: 1,
          },
        }
      )
      .then(({ data }) => {
        const tasksList = data['tasks_list'];
        console.log(tasksList);

        setCurrTasksList([]);
        tasksList.forEach((task) =>
          setCurrTasksList((prevState) => [
            ...prevState,
            {
              userID: task['userID'],
              taskID: task['taskID'],
              labelID: task['labelID'],
              time: task['time'],
              name: task['name'],
              description: task['description'],
              start: task['start'],
              onPlay: false,
            },
          ])
        );
      })
      .catch((e) => console.log(e));
  };

  // API call to fetch past task list that is stored in dynamodb on AWS and then copies
  // over in local state
  const fetchPastTasksList = () => {
    axios
      .get(URL + 'inactive-tasks/retrieve', {
        params: {
          userID: 1,
        },
      })
      .then(({ data }) => {
        const tasksList = data['tasks_list'];
        console.log(tasksList);
        setPastTasksList([]);
        tasksList.forEach((task) =>
          setPastTasksList((prevState) => [
            ...prevState,
            {
              userID: task['userID'],
              taskID: task['taskID'],
              labelID: task['labelID'],
              time: task['time'],
              name: task['name'],
              description: task['description'],
              start: task['start'],
              end: task['end'],
            },
          ])
        );
      })
      .catch((e) => console.log('fetchCurrTasksList fetch'));
  };

  // Initial call to fetch task list that is stored in dynamodb
  useEffect(() => {
    fetchCurrTasksList();
    fetchPastTasksList();
  }, []);

  // Send updated version of the task periodically when a task is playing
  useInterval(() => {
    currTasksList.forEach((task) => {
      if (task.onPlay) {
        console.log('updated task during play');
        updateTaskDatabase(task['userID'], task['taskID'], task['time']);
      }
    });
  }, 300000);

  // update time of each task every second when playing
  useInterval(() => {
    setCurrTasksList((currTasksList) =>
      currTasksList.map((task) => {
        if (task.onPlay) {
          return { ...task, time: task.time++ };
        }
        return task;
      })
    );
  }, 1000);

  // update the total time if a task(s) is playing
  useInterval(() => {
    if (currTasksList.filter((task) => task.onPlay).length > 0) {
      setTotalTime((totalTime) => totalTime + 1);
    }
  }, 1000);

  return (
    <div className='Popup'>
      <Navbar setCurrPage={setCurrPage} currPage={currPage} />
      {currPage === CURRENT_TASK_TAB ? (
        <CurrTaskScreen
          tasksList={currTasksList}
          setCurrTasksList={setCurrTasksList}
          setPastTasksList={setPastTasksList}
          totalTime={totalTime}
          setTotalTime={setTotalTime}
          labels={labels}
          setLabels={setLabels}
        />
      ) : (
        <PastTaskScreen tasksList={pastTasksList} />
      )}
    </div>
  );
}

export default Popup;
