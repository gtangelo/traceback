import React, { useState } from 'react';
import { CURRENT_TASK_TAB } from 'utils/constants';
import ClockConverter from 'utils/helpers/ClockConverter';
import TaskForm from 'components/TaskForm';
import TasksList from 'components/TasksList';
import './index.css';
import { AiOutlinePlus } from 'react-icons/ai';


const CurrTaskTab = ({
  tasksList,
  setTasksList,
  totalTime,
  labels,
  setLabels,
}) => {
  const [toggleForm, setToggleForm] = useState(false);

  let activeTasks = tasksList.filter((task) => task.onPlay);
  let activeTaskList = (
    <div className='tracking-task-list'>No task tracking</div>
  );
  if (activeTasks.length !== 0) {
    activeTaskList = activeTasks.map((task, i) => (
      <div className='task-name' key={i}>{task.name}</div>
    ));
  }

  const taskForm = toggleForm && (
    <div>
      <TaskForm
        ToggleTaskForm={() => setToggleForm((prevState) => !prevState)}
        labels={labels}
        setLabels={setLabels}
        setTasksList={setTasksList}
      />
    </div>
  );

  return (
    <div className='tab-container'>
      {taskForm}
      <div className='tracking-navbar'>
        <div className='heading'>Tracking</div>
        <div
          className='new-task-button'
          onClick={() => setToggleForm((prevState) => !prevState)}
        >
          <AiOutlinePlus size='20px' color='#333333' />
          <h5>Add Task</h5>
        </div>
      </div>
      <div className='tracking-section'>
        <div className='tracking-task-list'>{activeTaskList}</div>
        <h1>{ClockConverter(totalTime)}</h1>
      </div>
      <TasksList
        tasksList={tasksList}
        setCurrTasksList={setTasksList}
        labels={labels}
        tab={CURRENT_TASK_TAB}
      />
    </div>
  );
};

export default CurrTaskTab;