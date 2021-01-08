/* global chrome */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './axios';
import './Popup.css';

import Navbar from 'components/Navbar';
import LabelsTab from 'tabs/LabelsTab';
import SearchTab from 'tabs/SearchTab';
import CurrTaskTab from 'tabs/CurrTaskTab';
import PastTaskTab from 'tabs/PastTaskTab';
import useInterval from 'utils/hooks/useInterval';
import { CompareTimestamps } from 'utils/helpers';
import { retrieveCurrTasks, retrievePastTasks, retrieveLabels } from 'utils/api';
import { CURRENT_TASK_TAB, PAST_TASK_TAB, LABELS_TAB, SEARCH_TAB, USER_ID } from 'utils/constants';


const Popup = () => {
  const [tab, setTab] = useState(CURRENT_TASK_TAB);
  const [totalTime, setTotalTime] = useState(0);
  const [pastTasks, setPastTasks] = useState([]);
  const [currTasks, setCurrTasks] = useState([]);
  const [labels, setLabels] = useState([]);
  const [play, setPlay] = useState(null);

  // For every time the popup is clicked, make an initial API call depending on
  // the context.
  // - If the tasks list cannot be found in chrome storage, send a API request to
  //   retrieve the data found in the dynamodb database.
  // - Otherwise, if there is data in chrome storage, sync the dynamodb database
  //   with the tasks list found in chrome storage.
  // - Fetches label and past tasks data without any condition
  // Furthermore, it reset the total time during midnight.
  
  useEffect(() => {
    // This section of code determines if totalTime needs to be reset once it 
    // enters in a new day.
    axios
      .get('/time-logs/retrieve', {
        params: {
          userID: USER_ID,
        },
      })
      .then(({ data }) => {
        const timeLogs = data['time_logs'].sort((a, b) => b.date - a.date);
        if (timeLogs.length > 0) {
          if (!CompareTimestamps(timeLogs[0]['date'], Math.floor(Date.now() / 1000))) {
            // Case where the latest time log has not been recorded in the latest
            // day (i.e. today), reset total time to 0
            chrome.storage.local.set({ totalTime: 0 });
          }
        }
      })
      .catch((e) => console.log(e));
    // This section of code sync and retrieve tasks and label information from 
    // AWS.
    chrome.storage.local.get('currTasks', (payload) => {
      if (payload.currTasks.length > 0) {
        axios
          .put('/active-tasks/sync', {
            tasks_list: currTasks,
          })
          .catch((e) => console.log(e));
      } else {
        retrieveCurrTasks(setCurrTasks);
      }
      retrievePastTasks(setPastTasks);
      retrieveLabels(setLabels);
    });

  }, []);

  // For every second, update the state of all tasks to the data that is found 
  // in chrome storage since background.js updates the time of tasks and stores 
  // the result in chrome storage.
  useInterval(() => {
    chrome.storage.local.get(
      ['currTasks', 'totalTime'],
      (payload) => {
        setCurrTasks(payload.currTasks);
        setTotalTime(payload.totalTime);
        let status = payload.currTasks.filter((task) => task.onPlay).length > 0;
        setPlay(status);
      }
    );
  }, 1000);

  // Generates the start and end times of when at least a single task has been 
  // playing.
  useEffect(() => {
    if (play) {
      chrome.storage.local.get(['start'], ({ start }) => {
        if (start === 0) {
          chrome.storage.local.set({
            start: Math.floor(new Date().getTime() / 1000),
          });
        }
      });
    } else if (!play){
      chrome.storage.local.get(['start'], ({ start }) => {
        if (start !== 0) {
          axios
            .post('/time-log/create', {
              userID: USER_ID,
              start: start,
              end: Math.floor(new Date().getTime() / 1000),
            })
            .then(() => {
              chrome.storage.local.set({ start: 0 });
            })
            .catch((e) => console.log(e));
        }
      });
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
    currTab = (
      <PastTaskTab
        pastTasks={pastTasks}
        labels={labels}
        totalTime={totalTime}
      />
    );
  } else if (tab === LABELS_TAB) {
    currTab = <LabelsTab labels={labels} setLabels={setLabels} />;
  } else if (tab === SEARCH_TAB) {
    currTab = (
      <SearchTab
        labels={labels}
        currTasks={currTasks}
        setCurrTasks={setCurrTasks}
        pastTasks={pastTasks}
        totalTime={totalTime}
      />
    );
  }

  return (
    <div className='Popup'>
      <Navbar setTab={setTab} tab={tab} />
      {currTab}
    </div>
  );
};

export default Popup;
