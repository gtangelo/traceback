import React from 'react';
import ClockConverter from 'utils/ClockConverter';
import "./index.css"
import TaskForm from './TaskForm'

import deleteBtn from 'images/deleteIcon.png';
import finishBtn from 'images/uploadIcon.png';
import playBtn from 'images/playIcon.png';
import pauseBtn from 'images/pauseIcon.png';
import addBtn from 'images/expandIcon.png';

let displayForm = false;

const CurrTaskScreen = ({
  tasksList,
  setTasksList,
  setPastTasks,
  totalTime,
}) => {
  const AddNewTask = (newTaskName, newTaskDescription, labelID) => {
    let id = 1;
    if (tasksList.length !== 0) {
      id = tasksList[tasksList.length - 1].taskID + 1;
    }
    const newTask = {
      taskName: newTaskName,
      time: 0,
      isPlaying: false,
      taskID: id,
      description: newTaskDescription,
      labelID: labelID,
    };
    setTasksList([...tasksList, newTask]);
  };

  const PlayPauseTask = (isPlay, taskID) => {
    if (!isPlay) {
      console.log('playing');
    } else {
      console.log('not playing');
    }
    setTasksList((tasksList) =>
      tasksList.map((task) =>
        task.taskID === taskID ? { ...task, isPlaying: !isPlay } : task
      )
    );
  };

  const DeleteTask = (taskID) => {
    setTasksList((tasksList) =>
      tasksList.filter((task) => task.taskID !== taskID)
    );
  };

  const FinishTask = (taskID) => {
    const finishedTask = tasksList.filter((task) => task.taskID === taskID)[0];
    setPastTasks((pastTasks) => [
      ...pastTasks,
      {
        taskName: finishedTask.taskName,
        time: finishedTask.time,
        taskID: finishedTask.taskID,
        description: finishedTask.description,
      },
    ]);

    DeleteTask(taskID);
  };
  let timeFormat = ClockConverter(totalTime);

  let activeTasks = tasksList.filter((task) => task.isPlaying);
  let activeTaskList = (
    <div className='tracking-task-list'>No task tracking</div>
  );
  if (activeTasks.length !== 0) {
    activeTaskList = activeTasks.map((task) => (
      <div className='task-name'>{task.taskName}</div>
    ));
  }

  const DisplayTaskForm = () => {
    displayForm = !displayForm
  }

  return (
    <div className='tab-container'>
      <div className={!displayForm ? 'hidden' : ''}>
        <TaskForm AddNewTask={AddNewTask} DisplayTaskForm={DisplayTaskForm} />
      </div>
      <div className='tracking-navbar'>
        <div className='heading'>Tracking</div>
        <div className='new-task-button' onClick={DisplayTaskForm}>
          <img className='button-img' src={deleteBtn} alt='Add Task' />
          <h5>Add New Task</h5>
        </div>
      </div>
      <div className='tracking-section'>
        <div className='tracking-task-list'>{activeTaskList}</div>
        <h1>{timeFormat}</h1>
      </div>
      <div className='task-list-section'>
        <div className='sub-heading'>Current Tasks</div>
        {tasksList.map((task, i) => (
          <div className='task-item-container' key={i}>
            <div className='task-name-container'>
              <div className='task-colour' />
              <div className='task-name'>{task.taskName}</div>
            </div>
            <div className='buttons-container'>
              <div
                className='play-button'
                onClick={() => PlayPauseTask(task.isPlaying, task.taskID)}
              >
                {!task.isPlaying ? (
                  <img className='button-img' src={playBtn} alt='Play' />
                ) : (
                  <img className='button-img' src={pauseBtn} alt='Pause' />
                )}
                <h5>{ClockConverter(task.time)}</h5>
              </div>
              <div
                className='circle-button'
                onClick={() => DeleteTask(task.taskID)}
              >
                <img className='button-img' src={deleteBtn} alt='Delete' />
              </div>
              <div
                className='circle-button'
                onClick={() => FinishTask(task.taskID)}
              >
                <img className='button-img' src={finishBtn} alt='Finish' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrTaskScreen;