import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ClockConverter from 'utils/helpers/ClockConverter';

import './index.css';
import SpliceArrayByDay from 'utils/helpers/SpliceArrayByDay';
import ConvertTimestampToDay from 'utils/helpers/ConvertTimestampToDay';
import TaskListItem from './TaskListItem';
import { SubHeading } from 'components/Title';

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

  const ShowDate = () => {
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
    return todayDate.getTime() !== taskDate.getTime();
  };

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

  return (
    <div className='task-list-section'>
      {ShowDate() && (
        <div className='date-section'>
          <SubHeading>Today</SubHeading>
          <div>{ClockConverter(totalTime)}</div>
        </div>
      )}
      {tasksDayList.map((tasks, i) => (
        <div key={i}>
          {showDate && (
            <div className='date-section'>
              <SubHeading>
                {ConvertTimestampToDay(tasks[0]['start'])}
              </SubHeading>
              {showTime && (
                <div>{DisplayTotalTime(timeLogs, tasks[0]['start'])}</div>
              )}
            </div>
          )}
          {tasks.map((task, i) => (
            <TaskListItem
              task={task}
              labels={labels}
              tab={tab}
              showFinish={showFinish}
              showDelete={showDelete}
              setCurrTasks={setCurrTasks}
              setPastTasks={setPastTasks}
            />
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
