import React, {useState, useEffect} from 'react';
import ClockConverter from 'utils/ClockConverter';
import "./index.css"
import TaskForm from './TaskForm'
import TaskInfoModal from './TaskInfoModal'

import deleteBtn from 'images/deleteIcon.png';
import finishBtn from 'images/uploadIcon.png';
import playBtn from 'images/playIcon.png';
import pauseBtn from 'images/pauseIcon.png';
import addBtn from 'images/expandIcon.png';
import infoBtn from 'images/infoIcon.png';
import updateTaskDatabase from 'utils/updateTaskDatabase';
import axios from 'axios';
import { URL } from 'globals';

const CurrTaskScreen = ({
  tasksList,
  setCurrTasksList,
  setPastTasksList,
  totalTime,
  labels,
  setLabels,
}) => {
  const [toggleForm, setToggleForm] = useState(false)
  const [toggleInfo, setToggleInfo] = useState(false)

  const PlayPauseTask = (task) => {
    if (task.onPlay) {
      updateTaskDatabase(task['userID'], task['taskID'], task['time'])
      console.log('updated task');
    }
    setCurrTasksList((tasksList) =>
      tasksList.map((item) =>
        item.taskID === task.taskID ? { ...item, onPlay: !task.onPlay } : item
      )
    );
  };

  const DeleteTask = (taskID) => {
    axios.delete(
      URL + '/active-task/delete',
      {
        userID: 1,
        taskID: taskID
      }
    )
      .catch((e) => console.log(e));
    setCurrTasksList((tasksList) =>
      tasksList.filter((item) => item.taskID !== taskID)
    );
  };

  const FinishTask = (taskID, time) => {
    axios.put(
      URL + '/active-task/finish',
      {
        userID: 1,
        taskID: taskID,
        time: time
      }
    )
      .catch((e) => console.log(e));
  };

  let activeTasks = tasksList.filter((task) => task.onPlay);
  let activeTaskList = (
    <div className='tracking-task-list'>No task tracking</div>
  );
  if (activeTasks.length !== 0) {
    activeTaskList = activeTasks.map((task, i) => (
      <div className='task-name' key={i}>{task.name}</div>
    ));
  }

  const ToggleTaskForm = () => {
    setToggleForm(state => !state);
  };

  const ToggleTaskInfo = () => {
    setToggleInfo(state => !state);
  }

  return (
    <div className='tab-container'>
      <div className={!toggleForm ? 'hidden' : ''}>
        <TaskForm
          ToggleTaskForm={ToggleTaskForm}
          labels={labels}
          setLabels={setLabels}
          setTasksList={setCurrTasksList}
        />
      </div>
      <div className='tracking-navbar'>
        <div className='heading'>Tracking</div>
        <div className='new-task-button' onClick={ToggleTaskForm}>
          <img className='button-img' src={deleteBtn} alt='Add Task' />
          <h5>Add New Task</h5>
        </div>
      </div>
      <div className='tracking-section'>
        <div className='tracking-task-list'>{activeTaskList}</div>
        <h1>{ClockConverter(totalTime)}</h1>
      </div>
      <div className='task-list-section'>
        <div className='sub-heading'>Current Tasks</div>
        {tasksList.map((task, i) => (
          <div key={i}>
            <div className={!toggleInfo ? 'hidden' : ''}>
              <TaskInfoModal ToggleTaskInfo={ToggleTaskInfo} task={task} />
            </div>
            <div className='task-item-container'>
              <div className='task-name-container'>
                <div
                  className='task-colour'
                  style={{ backgroundColor: task.labelColour }}
                />
                <div className='task-name'>{task.name}</div>
              </div>
              <div className='buttons-container'>
                <div
                  className='play-button'
                  onClick={() => PlayPauseTask(task)}
                >
                  {!task.onPlay ? (
                    <img className='button-img' src={playBtn} alt='Play' />
                  ) : (
                    <img className='button-img' src={pauseBtn} alt='Pause' />
                  )}
                  <h5>{ClockConverter(task.time)}</h5>
                </div>
                <div className='circle-button' onClick={() => DeleteTask(task.taskID)}>
                  <img className='button-img' src={deleteBtn} alt='Delete' />
                </div>
                <div className='circle-button' onClick={() => FinishTask(task.taskID, task.time)}>
                  <img className='button-img' src={finishBtn} alt='Finish' />
                </div>
                <div className='circle-button' onClick={ToggleTaskInfo}>
                  <img className='button-img' src={infoBtn} alt='Info' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrTaskScreen;