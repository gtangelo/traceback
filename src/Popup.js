import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './axios'

import useInterval from 'utils/hooks/useInterval';
import updateTaskDatabase from 'utils/helpers/updateTaskDatabase';
import { CURRENT_TASK_TAB, PAST_TASK_TAB } from 'utils/constants';

import Navbar from 'components/Navbar/';
import CurrTaskScreen from 'tabs/CurrTask/';
import PastTaskScreen from 'tabs/PastTask/';

import './Popup.css'

const Popup = () => {
  const [tab, setTab] = useState(CURRENT_TASK_TAB);
  const [totalTime, setTotalTime] = useState(0);
  const [pastTasksList, setPastTasksList] = useState([]);
  const [currTasksList, setCurrTasksList] = useState([]);
  const [labels, setLabels] = useState([]);

  // API call to fetch task list that is stored in dynamodb on AWS and then copies
  // over in local state
  const fetchCurrTasksList = () => {
    axios
      .get(
        '/active-tasks/retrieve',
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
        tasksList.sort((a, b) => b['start'] - a['start']).forEach((task) =>
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
      .get('/inactive-tasks/retrieve', {
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
      .catch((e) => console.log(e));
  };

  // Initial call to fetch task list that is stored in dynamodb
  useEffect(() => {
    fetchCurrTasksList();
    fetchPastTasksList();
  }, [tab]);

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

  let currTab = "Page not found";
  if (tab === CURRENT_TASK_TAB) {
    currTab = (
      <CurrTaskScreen
        tasksList={currTasksList}
        setTasksList={setCurrTasksList}
        totalTime={totalTime}
        labels={labels}
        setLabels={setLabels}
      />
    );
  } else if (tab === PAST_TASK_TAB) {
    currTab = <PastTaskScreen tasksList={pastTasksList} labels={labels} />;
  }

  return (
    <div className='Popup'>
      <Navbar setTab={setTab} tab={tab} />
      {currTab}
    </div>
  );
}

export default Popup;
