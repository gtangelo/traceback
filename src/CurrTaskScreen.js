import React, { useState, useEffect } from 'react';
import CurrTaskList from './CurrTaskList';
import NewTaskForm from './NewTaskForm';
import ConvertToClock from './CovertToClock'



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

  return (
    <div>
      <h1>Today's Total Time: {ConvertToClock(totalTime)}</h1>
      Current Task Screen
      <CurrTaskList
        tasks={tasksList}
        PlayPauseTask={PlayPauseTask}
        DeleteTask={DeleteTask}
        FinishTask={FinishTask}
      />
      <NewTaskForm AddNewTask={AddNewTask} />
    </div>
  );
};

export default CurrTaskScreen;