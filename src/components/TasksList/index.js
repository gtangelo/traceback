import React, { useState } from 'react';
import axios from 'axios';

import ClockConverter from 'utils/helpers/ClockConverter';
import LabelIDToColour from 'utils/helpers/LabelIDToColour';
import LabelIDToName from 'utils/helpers/LabelIDToName';
import updateTaskDatabase from 'utils/helpers/updateTaskDatabase';

import deleteBtn from 'images/deleteIcon.png';
import finishBtn from 'images/uploadIcon.png';
import playBtn from 'images/playIcon.png';
import pauseBtn from 'images/pauseIcon.png';
import infoBtn from 'images/infoIcon.png';

import { Tooltip } from '@material-ui/core';
import TaskInfoModal from 'components/TaskInfoModal';
import { CURRENT_TASK_TAB } from 'utils/constants';

import './index.css';

const TasksList = ({
  tasksList,
  setCurrTasksList,
  labels,
  tab
}) => {
  const [toggleInfo, setToggleInfo] = useState(false);

  const PlayPauseTask = (task) => {
    if (task.onPlay) {
      updateTaskDatabase(task['userID'], task['taskID'], task['time']);
      console.log('updated task');
    }
    setCurrTasksList((tasksList) =>
      tasksList.map((item) =>
        item.taskID === task.taskID ? { ...item, onPlay: !task.onPlay } : item
      )
    );
  };

  const DeleteTask = (taskID) => {
    axios
      .delete('/active-task/delete', {
        params: {
          userID: 1,
          taskID: taskID,
        },
      })
      .then(() => {
        setCurrTasksList((tasksList) =>
          tasksList.filter((task) => task.taskID !== taskID)
        );
      })
      .catch((e) => console.log(e));
  };

  const FinishTask = (taskID, time) => {
    axios
      .put('/active-task/finish', {
        userID: 1,
        taskID: taskID,
        time: time,
      })
      .then(() => {
        setCurrTasksList((tasksList) =>
          tasksList.filter((task) => task.taskID !== taskID)
        );
      })
      .catch((e) => console.log(e));
  };

  const SpliceArrayByDay = (arr) => {
    let newArr = [];
    let i = 0;
    while (i < arr.length) {
      let temp = [];
      temp.push(arr[i]);
      let j = i + 1;
      while (j < arr.length) {
        let taskDate = new Date(0);
        taskDate.setUTCSeconds(temp[0]['start']);
        taskDate.setHours(0, 0, 0, 0);
        let d = new Date(0);
        d.setUTCSeconds(arr[j]['start']);
        d.setHours(0, 0, 0, 0);
        if (taskDate.getTime() === d.getTime()) {
          temp.push(arr[j]);
        } else {
          break;
        }
        j++;
      }
      newArr.push(temp);
      i = j;
    }
    return newArr;
  };

  const tasksDayList = SpliceArrayByDay(tasksList);
  
  const ConvertDateToDay = (taskDatetime) => {
    const taskDate = new Date(0);
    taskDate.setUTCSeconds(taskDatetime);
    taskDate.setHours(0, 0, 0, 0);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    if (todayDate.getTime() === taskDate.getTime()) {
      return 'Today';
    } else if (yesterdayDate.getTime() === taskDate.getTime()) {
      return 'Yesterday';
    } else {
      return taskDate.toDateString();
    }
  };

  return (
    <div className='task-list-section'>
      {tasksDayList.map((tasks, i) => (
        <div key={i}>
          <div className='sub-heading'>
            {ConvertDateToDay(tasks[0]['start'])}
          </div>
          {tasks.map((task, i) => (
            <div key={i}>
              <div className={!toggleInfo ? 'hidden' : ''}>
                <TaskInfoModal
                  ToggleTaskInfo={() =>
                    setToggleInfo((prevState) => !prevState)
                  }
                  task={task}
                />
              </div>
              <div className='task-item-container'>
                <div className='task-name-container'>
                  <Tooltip title={LabelIDToName(labels, task.taskID)} arrow>
                    <div
                      className='task-colour'
                      style={{
                        backgroundColor: LabelIDToColour(labels, task.labelID),
                      }}
                    />
                  </Tooltip>
                  <div className='task-name'>{task.name}</div>
                </div>
                {tab === CURRENT_TASK_TAB ? (
                  <div className='buttons-container'>
                    <div
                      className='play-button'
                      onClick={() => PlayPauseTask(task)}
                    >
                      {!task.onPlay ? (
                        <img className='button-img' src={playBtn} alt='Play' />
                      ) : (
                        <img
                          className='button-img'
                          src={pauseBtn}
                          alt='Pause'
                        />
                      )}
                      <h5>{ClockConverter(task.time)}</h5>
                    </div>
                    <div
                      className='circle-button'
                      onClick={() => DeleteTask(task.taskID)}
                    >
                      <img
                        className='button-img'
                        src={deleteBtn}
                        alt='Delete'
                      />
                    </div>
                    <div
                      className='circle-button'
                      onClick={() => FinishTask(task.taskID, task.time)}
                    >
                      <img
                        className='button-img'
                        src={finishBtn}
                        alt='Finish'
                      />
                    </div>
                    <div
                      className='circle-button'
                      onClick={() => setToggleInfo((prevState) => !prevState)}
                    >
                      <img className='button-img' src={infoBtn} alt='Info' />
                    </div>
                  </div>
                ) : (
                  <div className='buttons-container'>
                    <div className='play-button'>
                      <h5>{ClockConverter(task.time)}</h5>
                    </div>
                    <div
                      className='circle-button'
                      onClick={() => setToggleInfo((prevState) => !prevState)}
                    >
                      <img className='button-img' src={infoBtn} alt='Info' />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TasksList;
