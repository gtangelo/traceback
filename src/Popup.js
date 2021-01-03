/* global chrome */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './axios'

import useInterval from 'utils/hooks/useInterval';
import { CURRENT_TASK_TAB, PAST_TASK_TAB, LABELS_TAB, SEARCH_TAB } from 'utils/constants';

import Navbar from 'components/Navbar/';

import './Popup.css'
import LabelsTab from 'tabs/LabelsTab';
import SearchTab from 'tabs/SearchTab';
import CurrTaskTab from 'tabs/CurrTaskTab';
import PastTaskTab from 'tabs/PastTaskTab';
import retrieveCurrTasks from 'utils/helpers/retrieveCurrTasks';
import retrievePastTasks from 'utils/helpers/retrievePastTasks';

const Popup = () => {
  const [tab, setTab] = useState(CURRENT_TASK_TAB);
  const [totalTime, setTotalTime] = useState(0);
  const [pastTasks, setPastTasks] = useState([]);
  const [currTasks, setCurrTasks] = useState([]);
  const [labels, setLabels] = useState([]);
  const [totalTimeLog, setTotalTimeLog] = useState([]);

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

  // Make a PUT request to update data in the dynamodb database
  const syncCurrTasks = (tasks) => {
    axios
      .put('/active-tasks/sync', {
        tasks_list: tasks,
      })
      .then((resp) => console.log(resp))
      .catch((e) => console.log(e));
  };

  // For every time the popup is clicked, make an initial API call depending on
  // the context.
  // - If the tasks list cannot be found in chrome storage, send a API request to
  //   retrieve the data found in the dynamodb database.
  // - Otherwise, if there is data in chrome storage, sync the dynamodb database
  //   with the tasks list found in chrome storage.
  // - Fetches label and past tasks data without any condition
  useEffect(() => {
    chrome.storage.sync.get('currTasks', (payload) => {
      if (payload.currTasks.length > 0) {
        syncCurrTasks(payload.currTasks);
      } else {
        retrieveCurrTasks(setCurrTasks);
      }
      retrievePastTasks(setPastTasks);
      fetchLabels();
    });
  }, []);

  // For every second, update the state of all tasks to the data that is found 
  // in chrome storage since background.js updates the time of tasks and stores 
  // the result in chrome storage.
  useInterval(() => {
    chrome.storage.sync.get(
      ['currTasks', 'pastTasks'],
      (payload) => {
        setCurrTasks(payload.currTasks);
        setPastTasks(payload.pastTasks);
      }
    );
  }, 1000);

  // TODO
  // Update the total time if a task(s) is playing
  useInterval(() => {
    if (currTasks.filter((task) => task.onPlay).length > 0) {
      setTotalTime((totalTime) => totalTime + 1);
    }
  }, 1000);


  // Generates the start and end times of when atleast a single task has been 
  // playing.
  const play = currTasks.filter((task) => task.onPlay).length > 0;
  useEffect(() => {
    if (play) {
      const log = {};
      log.start = new Date();
      setTotalTimeLog((prevState) => [...prevState, log]);
      console.log('play');
    } else {
      let tmp = totalTimeLog;
      if (tmp.length > 0) {
        tmp[tmp.length - 1].end = new Date();
      }
      console.log(tmp);
      setTotalTimeLog(tmp);
      let t = tmp.reduce(
        (total, time) => total + time.end.getTime() - time.start.getTime(),
        0
      );
      console.log(t / 1000);
      console.log('not play');
    }
  }, [play]);

  // Determine which tab to show
  let currTab = 'Page not found';
  if (tab === CURRENT_TASK_TAB) {
    currTab = (
      <CurrTaskTab
        currTasks={currTasks}
        setCurrTasks={setCurrTasks}
        setPastTasks={setPastTasks}
        totalTime={totalTime}
        labels={labels}
        setLabels={setLabels}
      />
    );
  } else if (tab === PAST_TASK_TAB) {
    currTab = <PastTaskTab pastTasks={pastTasks} labels={labels} />;
  } else if (tab === LABELS_TAB) {
    currTab = <LabelsTab labels={labels} setLabels={setLabels} />;
  } else if (tab === SEARCH_TAB) {
    currTab = (
      <SearchTab
        labels={labels}
        currTasks={currTasks}
        setCurrTasks={setCurrTasks}
        pastTasks={pastTasks}
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
