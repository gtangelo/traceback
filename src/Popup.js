import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './axios'

import useInterval from 'utils/hooks/useInterval';
import updateTaskDatabase from 'utils/helpers/updateTaskDatabase';
import { CURRENT_TASK_TAB, PAST_TASK_TAB, LABELS_TAB, SEARCH_TAB } from 'utils/constants';

import Navbar from 'components/Navbar/';

import './Popup.css'
import LabelsTab from 'tabs/LabelsTab';
import SearchTab from 'tabs/SearchTab';
import CurrTaskTab from 'tabs/CurrTaskTab';
import PastTaskTab from 'tabs/PastTaskTab';

const Popup = () => {
  const [tab, setTab] = useState(CURRENT_TASK_TAB);
  const [totalTime, setTotalTime] = useState(0);
  const [pastTasksList, setPastTasksList] = useState([]);
  const [currTasksList, setCurrTasksList] = useState([]);
  const [labels, setLabels] = useState([]);
  const [totalTimeLog, setTotalTimeLog] = useState([]);

  // API call to fetch task list that is stored in dynamodb on AWS and then copies
  // over in local state
  const fetchCurrTasksList = () => {
    axios
      .get('/active-tasks/retrieve', {
        params: {
          userID: 1,
        },
      })
      .then(({ data }) => {
        const tasksList = data['tasks_list'];
        console.log(tasksList);
        setCurrTasksList([]);
        tasksList
          .sort((a, b) => b['start'] - a['start'])
          .forEach((task) =>
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
        setPastTasksList(tasksList.sort((a, b) => b['start'] - a['start']));
      })
      .catch((e) => console.log(e));
  };

  // API call to fetch all labels that is stored in dynamodb on AWS and then copies
  // over in local state
  const fetchLabels = () => {
    axios
      .get('/labels/retrieve', {
        params: {
          userID: 1,
        },
      })
      .then(({ data }) => {
        const labels = data['labels'];
        console.log(labels);
        setLabels(labels);
      })
      .catch((e) => console.log(e));
  };

  // Initial call to fetch task list that is stored in dynamodb
  useEffect(() => {
    fetchCurrTasksList();
    fetchPastTasksList();
    fetchLabels();
  }, []);

  // Fetch updated call
  useEffect(() => {
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
          return { ...task, time: task.time + 1 };
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
  
  const play = currTasksList.filter((task) => task.onPlay).length > 0;

  useEffect(() => {
    if (play) {
      const log = {}
      log.start = new Date()
      setTotalTimeLog(prevState => [...prevState, log])
      console.log("play")
    } else {
      let tmp = totalTimeLog
      if (tmp.length > 0) {
        tmp[tmp.length - 1].end = new Date();
      }
      console.log(tmp)
      setTotalTimeLog(tmp)
      let t = tmp.reduce(
        (total, time) =>
          total + time.end.getTime() - time.start.getTime(),
        0
      );
      console.log(t/1000);
      console.log("not play")
    }
  }, [play])

  let currTab = 'Page not found';
  if (tab === CURRENT_TASK_TAB) {
    currTab = (
      <CurrTaskTab
        tasksList={currTasksList}
        setTasksList={setCurrTasksList}
        totalTime={totalTime}
        labels={labels}
        setLabels={setLabels}
      />
    );
  } else if (tab === PAST_TASK_TAB) {
    currTab = <PastTaskTab tasksList={pastTasksList} labels={labels} />;
  } else if (tab === LABELS_TAB) {
    currTab = <LabelsTab labels={labels} setLabels={setLabels} />
  } else if (tab === SEARCH_TAB) {
    currTab = (
      <SearchTab
        labels={labels}
        currTasksList={currTasksList}
        setCurrTasksList={setCurrTasksList}
        pastTasksList={pastTasksList}
      />
    );
  }

  return (
    <div className='Popup'>
      <Navbar setTab={setTab} tab={tab} />
      {currTab}
    </div>
  );
}

export default Popup;
