/* global chrome */
import React, { useState } from 'react';
import axios from 'axios';

import ClockConverter from 'utils/helpers/ClockConverter';
import LabelIDToColour from 'utils/helpers/LabelIDToColour';
import LabelIDToName from 'utils/helpers/LabelIDToName';
import updateTaskDatabase from 'utils/helpers/updateTaskDatabase';

import {
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiFillDelete,
  AiOutlineCheck,
  AiOutlineInfo,
} from 'react-icons/ai';

import { Tooltip } from '@material-ui/core';
import TaskInfoModal from 'components/TaskInfoModal';
import { CURRENT_TASK_TAB } from 'utils/constants';

import './index.css';
import SpliceArrayByDay from 'utils/helpers/SpliceArrayByDay';
import retrieveCurrTasks from 'utils/helpers/retrieveCurrTasks';
import retrievePastTasks from 'utils/helpers/retrievePastTasks';

const TasksList = ({
  tasksList,
  labels,
  tab,
  showDate,
  showDelete,
  showFinish,
  showInfo,
  setCurrTasks,
  setPastTasks
}) => {
  const [toggleInfo, setToggleInfo] = useState(false);

  const PlayPauseTask = (task) => {
    if (task.onPlay) {
      updateTaskDatabase(task['userID'], task['taskID'], task['time']);
      console.log('updated task');
    }
    chrome.storage.sync.get("currTasks", ({ currTasks }) => {
      chrome.storage.sync.set({
        currTasks: currTasks.map((item) =>
          item.taskID === task.taskID ? { ...item, onPlay: !task.onPlay } : item
        ),
      });
    })
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
        retrieveCurrTasks(setCurrTasks);
        retrievePastTasks(setPastTasks);
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
        retrieveCurrTasks(setCurrTasks);
        retrievePastTasks(setPastTasks);
      })
      .catch((e) => console.log(e));
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
          {showDate && (
            <div className='sub-heading'>
              {ConvertDateToDay(tasks[0]['start'])}
            </div>
          )}
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
                  <Tooltip title={LabelIDToName(labels, task.labelID)} arrow>
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
                        <AiFillPlayCircle size='20px' color='#333333' />
                      ) : (
                        <AiFillPauseCircle size='20px' color='#333333' />
                      )}
                      <h5>{ClockConverter(task.time)}</h5>
                    </div>
                    {showDelete && (
                      <div
                        className='circle-button'
                        onClick={() => DeleteTask(task.taskID)}
                      >
                        <AiFillDelete size='20px' color='#333333' />
                      </div>
                    )}
                    {showFinish && (
                      <div
                        className='circle-button'
                        onClick={() => FinishTask(task.taskID, task.time)}
                        AiOutlineCheck
                      >
                        <AiOutlineCheck size='20px' color='#333333' />
                      </div>
                    )}
                    {showInfo && (
                      <div
                        className='circle-button'
                        onClick={() => setToggleInfo((prevState) => !prevState)}
                      >
                        <AiOutlineInfo size='20px' color='#333333' />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='buttons-container'>
                    <div className='play-button'>
                      <h5>{ClockConverter(task.time)}</h5>
                    </div>
                    {showInfo && (
                      <div
                        className='circle-button'
                        onClick={() => setToggleInfo((prevState) => !prevState)}
                      >
                        <AiOutlineInfo size='20px' color='#333333' />
                      </div>
                    )}
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
