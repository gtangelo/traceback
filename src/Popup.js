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
import retrieveLabels from 'utils/helpers/retrieveLabels';

const Popup = () => {
  const [tab, setTab] = useState(CURRENT_TASK_TAB);
  const [totalTime, setTotalTime] = useState(0);
  const [pastTasks, setPastTasks] = useState([]);
  const [currTasks, setCurrTasks] = useState([]);
  const [labels, setLabels] = useState([]);
  const [play, setPlay] = useState(null)

  // For every time the popup is clicked, make an initial API call depending on
  // the context.
  // - If the tasks list cannot be found in chrome storage, send a API request to
  //   retrieve the data found in the dynamodb database.
  // - Otherwise, if there is data in chrome storage, sync the dynamodb database
  //   with the tasks list found in chrome storage.
  // - Fetches label and past tasks data without any condition

  // Furthermore, it fetches the total time spent of recording tasks for 
  // previous days.
  useEffect(() => {
    chrome.storage.local.get(["lastUsed"], ({ lastUsed }) => {
      console.log(lastUsed)
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      lastUsed.setHours(0, 0, 0, 0);
      if (lastUsed.getTime() !== todayDate.getTime()) {
        chrome.storage.local.set({totalTime: 0})
      }
      chrome.storage.local.set({lastUsed: new Date()})
    });

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
      ['currTasks', 'pastTasks', 'totalTime'],
      (payload) => {
        setCurrTasks(payload.currTasks);
        setTotalTime(payload.totalTime);
        let status = payload.currTasks.filter((task) => task.onPlay).length > 0;
        setPlay(status)
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
              userID: 1,
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
}

export default Popup;
