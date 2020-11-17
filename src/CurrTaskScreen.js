import React, { useState, useEffect } from 'react';
import CurrTaskList from './CurrTaskList';
import NewTaskForm from './NewTaskForm';
import ConvertToClock from './CovertToClock'

import "./index.css"
import TotalTimeCard from './TotalTimeCard';


const CurrTaskScreen = ({
  tasksList,
  setTasksList,
  setPastTasks,
  totalTime,
}) => {
  const AddNewTask = (newTaskName, newTaskDescription) => {
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
  let timeFormat = ConvertToClock(totalTime);
  return (
    <div className='main-content'>
      <TotalTimeCard timeFormat={timeFormat} />
      <NewTaskForm AddNewTask={AddNewTask} />
      <CurrTaskList
        tasks={tasksList}
        PlayPauseTask={PlayPauseTask}
        DeleteTask={DeleteTask}
        FinishTask={FinishTask}
      />
    </div>
  );
};

export default CurrTaskScreen;