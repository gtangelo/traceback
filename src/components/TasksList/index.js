/* global chrome */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ClockConverter from 'utils/helpers/ClockConverter';
import LabelIDToColour from 'utils/helpers/LabelIDToColour';
import LabelIDToName from 'utils/helpers/LabelIDToName';
import updateTaskDatabase from 'utils/helpers/updateTaskDatabase';

import {
  FaInfo,
  FaPlayCircle,
  FaPauseCircle,
  FaLongArrowAltRight,
  FaBackspace,
} from 'react-icons/fa';


import { Tooltip } from '@material-ui/core';
import TaskInfoModal from 'components/TaskInfoModal';
import { CURRENT_TASK_TAB } from 'utils/constants';

import './index.css';
import SpliceArrayByDay from 'utils/helpers/SpliceArrayByDay';
import retrieveCurrTasks from 'utils/helpers/retrieveCurrTasks';
import retrievePastTasks from 'utils/helpers/retrievePastTasks';
import syncCurrTasks from 'utils/helpers/syncCurrTasks';
import ConvertTimestampToDay from 'utils/helpers/ConvertTimestampToDay';


const TaskItem = ({
  task,
  labels,
  tab,
  showDelete,
  showFinish,
  setCurrTasks,
  setPastTasks,
}) => {
  const [toggleInfo, setToggleInfo] = useState(false);

  const PlayPauseTask = (task) => {
    if (task.onPlay) {
      updateTaskDatabase(task['userID'], task['taskID'], task['time']);
      console.log('updated task');
    }
    chrome.storage.local.get('currTasks', ({ currTasks }) => {
      chrome.storage.local.set({
        currTasks: currTasks.map((item) =>
          item.taskID === task.taskID ? { ...item, onPlay: !task.onPlay } : item
        ),
      });
    });
  };

  const DeleteTask = (taskID) => {
    syncCurrTasks(setCurrTasks);
    axios
      .delete('/active-task/delete', {
        params: {
          userID: 1,
          taskID: taskID,
        },
      })
      .then(() => {
        retrievePastTasks(setPastTasks);
      })
      .catch((e) => console.log(e));
  };

  const FinishTask = (taskID, time) => {
    syncCurrTasks(setCurrTasks);
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

  return (
    <div>
      <div className={!toggleInfo ? 'hidden' : ''}>
        <TaskInfoModal
          setToggleInfo={setToggleInfo}
          task={task}
          labels={labels}
        />
      </div>
      <div className='task-item-container'>
        <div
          className='task-name-container'
          onClick={() => setToggleInfo((prevState) => !prevState)}
        >
          <Tooltip
            title={LabelIDToName(labels, task.labelID)}
            arrow
            placement='top'
          >
            <div
              className='task-colour'
              style={{
                backgroundColor: LabelIDToColour(labels, task.labelID),
              }}
            >
              <FaInfo size='12px' color='#333333' />
            </div>
          </Tooltip>
          <div className='task-name'>{task.name}</div>
        </div>
        {tab === CURRENT_TASK_TAB ? (
          <div className='buttons-container'>
            <Tooltip title='Play/Pause' arrow placement='top'>
              <div className='play-button' onClick={() => PlayPauseTask(task)}>
                {!task.onPlay ? (
                  <FaPlayCircle size='16px' color='#333333' />
                ) : (
                  <FaPauseCircle size='16px' color='#333333' />
                )}
                <h5>{ClockConverter(task.time)}</h5>
              </div>
            </Tooltip>

            {showDelete && (
              <Tooltip title='Delete' arrow placement='top'>
                <div
                  className='circle-button'
                  onClick={() => DeleteTask(task.taskID)}
                >
                  <FaBackspace size='16px' color='#333333' />
                </div>
              </Tooltip>
            )}
            {showFinish && (
              <Tooltip title='Finish' arrow placement='top'>
                <div
                  className='circle-button'
                  onClick={() => FinishTask(task.taskID, task.time)}
                  AiOutlineCheck
                >
                  <FaLongArrowAltRight size='16px' color='#333333' />
                </div>
              </Tooltip>
            )}
          </div>
        ) : (
          <div className='buttons-container'>
            <Tooltip title='Time' arrow placement='top'>
              <div className='play-button'>
                <h5>{ClockConverter(task.time)}</h5>
              </div>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

const TasksList = ({
  tasksList,
  totalTime,
  labels,
  tab,
  setCurrTasks,
  setPastTasks,
  showDelete,
  showFinish,
  showDate,
  showToday,
  showTime,
}) => {
  const [timeLogs, setTimeLogs] = useState([]);
  const tasksDayList = SpliceArrayByDay(tasksList);

  const DisplayTotalTime = (time_logs, date_timestamp) => {
    let time = 0;
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const taskDate = new Date(0);
    taskDate.setUTCSeconds(date_timestamp);
    taskDate.setHours(0, 0, 0, 0);
    if (taskDate.getTime() === todayDate.getTime()) {
      time = totalTime;
    } else {
      for (let i = 0; i < time_logs.length; i++) {
        const logDate = new Date(0);
        logDate.setUTCSeconds(time_logs[i]['date']);
        logDate.setHours(0, 0, 0, 0);
        if (logDate.getTime() === taskDate.getTime()) {
          time = time_logs[i]['time'];
        }
      }
    }
    return ClockConverter(time);
  };

  useEffect(() => {
    axios
      .get('/time-logs/retrieve', {
        params: {
          userID: 1,
        },
      })
      .then(({ data }) => {
        setTimeLogs(data['time_logs'].sort((a, b) => b.date - a.date));
      })
      .catch((e) => console.log(e));
  }, []);

  const ValidateDate = () => {
    if (
      !showDate ||
      !showToday ||
      tasksDayList.length === 0 ||
      tasksDayList[0].length === 0
    ) {
      return false;
    }

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const taskDate = new Date(0);
    taskDate.setUTCSeconds(tasksDayList[0][0]['start']);
    taskDate.setHours(0, 0, 0, 0);
    if (todayDate.getTime() === taskDate.getTime()) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className='task-list-section'>
      {ValidateDate() && (
        <div className='day-container'>
          <div className='sub-heading'>Today</div>
          <div>{ClockConverter(totalTime)}</div>
        </div>
      )}
      {tasksDayList.map((tasks, i) => (
        <div key={i}>
          {showDate && (
            <div className='day-container'>
              <div className='sub-heading'>
                {ConvertTimestampToDay(tasks[0]['start'])}
              </div>
              {showTime && (
                <div>{DisplayTotalTime(timeLogs, tasks[0]['start'])}</div>
              )}
            </div>
          )}
          {tasks.map((task, i) => (
            <TaskItem task={task} labels={labels} tab={tab} showFinish={showFinish} showDelete={showDelete}
              setCurrTasks={setCurrTasks} setPastTasks={setPastTasks}/>
          ))}
        </div>
      ))}
    </div>
  );
};

TasksList.defaultProps = {
  showToday: false,
  showTime: false,
  showDate: false,
  showDelete: false,
  showFinish: false,
  showInfo: false,
};

export default TasksList;
