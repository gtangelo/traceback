/* global chrome */
import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

import { FaPlus } from 'react-icons/fa';

import TaskForm from 'components/TaskForm';
import TasksList from 'components/TasksList';
import { TabContainer } from 'components/styled/Container';
import { AddButton } from 'components/styled/Button';
import {
  HeaderSection,
  Heading,
  TaskTitle,
} from 'components/styled/Title';
import { ClockConverter } from 'utils/helpers';
import { syncCurrTasks } from 'utils/api';
import { CURRENT_TASK_TAB } from 'utils/constants';

const CurrTaskTab = ({ currTasks, setCurrTasks, setPastTasks, totalTime, labels, setLabels }) => {
  const [toggleForm, setToggleForm] = useState(false);

  // create a list of all playing tasks
  let activeTasks = currTasks.filter((task) => task.onPlay);
  let activeTaskList = "No task tracking";
  if (activeTasks.length !== 0) {
    activeTaskList = activeTasks.map((task, i) => (
      <TaskTitle key={i}>
        {task.name}
      </TaskTitle>
    ));
  }

  const PauseAllTasks = () => {
    const tasks = currTasks.map((task) => ({...task, onPlay: false }) );
    chrome.storage.local.set({ currTasks: tasks }, () => syncCurrTasks(setCurrTasks));
  };

  return (
    <TabContainer>
      {toggleForm && (
        <TaskForm
          setToggleForm={setToggleForm}
          labels={labels}
          setLabels={setLabels}
          setCurrTasks={setCurrTasks}
        />
      )}
      <HeaderSection>
        <Heading>Tracking</Heading>
        <AddButton onClick={() => setToggleForm((prevState) => !prevState)}>
          <FaPlus size='16px' color='#333333' />
          <TaskTitle>Add Task</TaskTitle>
        </AddButton>
      </HeaderSection>
      <div className='tracking-bar'>
        <div className='tracking-tasks'>{activeTaskList}</div>
        <h1>{ClockConverter(totalTime)}</h1>
        <div className='stop-btn' onClick={PauseAllTasks}>
          STOP
        </div>
      </div>
      {currTasks.length === 0 ? (
        <div>No tasks has been created</div>
      ) : (
        <TasksList
          tasksList={currTasks}
          labels={labels}
          tab={CURRENT_TASK_TAB}
          setCurrTasks={setCurrTasks}
          setPastTasks={setPastTasks}
          totalTime={totalTime}
          showDate
          showDelete
          showFinish
        />
      )}
    </TabContainer>
  );
};

export default CurrTaskTab;