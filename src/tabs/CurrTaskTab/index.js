import React, { useState } from 'react';
import './index.css';

import { FaPlus } from 'react-icons/fa';

import TaskForm from 'components/TaskForm';
import TasksList from 'components/TasksList';
import { TabContainer } from 'components/styled/Container';
import { AddButton } from 'components/styled/Button';
import { HeaderSection, Heading, TaskTitle } from 'components/styled/Title';
import { ClockConverter } from 'utils/helpers';
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
          <FaPlus size='20px' color='#333333' />
          <h5>Add Task</h5>
        </AddButton>
      </HeaderSection>
      <div className='tracking-bar'>
        <div className='tracking-tasks'>{activeTaskList}</div>
        <h1>{ClockConverter(totalTime)}</h1>
      </div>
      <TasksList
        tasksList={currTasks}
        labels={labels}
        tab={CURRENT_TASK_TAB}
        setCurrTasks={setCurrTasks}
        setPastTasks={setPastTasks}
        totalTime={totalTime}
        showTime
        showToday
        showDate
        showDelete
        showFinish
      />
    </TabContainer>
  );
};

export default CurrTaskTab;