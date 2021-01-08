import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

import TaskListItem from './TaskListItem';
import { SubHeading } from 'components/styled/Title';
import {
  ClockConverter,
  ConvertTimestampToDay,
  SpliceArrayByDay,
  CompareTimestamps,
} from 'utils/helpers';
import { USER_ID } from 'utils/constants';

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
}) => {
  const [timeLogs, setTimeLogs] = useState([]);
  const tasksDayList = SpliceArrayByDay(tasksList);

  // useEffect for a single API call to retrieve the time logs from dynamodb
  // database
  useEffect(() => {
    axios
      .get('/time-logs/retrieve', {
        params: {
          userID: USER_ID,
        },
      })
      .then(({ data }) => {
        setTimeLogs(data['time_logs'].sort((a, b) => b.date - a.date));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className='task-list-section'>
      {showDate && (
        <div className='date-section'>
          <SubHeading>Today</SubHeading>
          <div>{ClockConverter(totalTime)}</div>
        </div>
      )}
      {timeLogs.length === 0 ? (
        <>
          {tasksDayList.map((tasks, i) => (
            <div key={i}>
              {showDate &&
                !CompareTimestamps(
                  tasks[0]['start'],
                  Math.floor(Date.now() / 1000)
                ) && (
                <div className='date-section'>
                  <SubHeading>
                    {ConvertTimestampToDay(tasks[0]['start'])}
                  </SubHeading>
                  <div>Not recorded</div>
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
                  key={i}
                />
              ))}
            </div>
          ))}
        </>
      ) : (
        <>
          {timeLogs.map((timeLog, i) => (
            <div key={i}>
              {showDate &&
                !CompareTimestamps(
                  timeLog['date'],
                  Math.floor(Date.now() / 1000)
                ) && (
                <div className='date-section'>
                  <SubHeading>
                    {ConvertTimestampToDay(timeLog['date'])}
                  </SubHeading>
                  <div>{ClockConverter(timeLog['time'])}</div>
                </div>
              )}
              {tasksDayList.map((tasks, i) => (
                <div key={i}>
                  {tasks.map((task, i) => (
                    <div key={i}>
                      {CompareTimestamps(
                        timeLog['date'],
                        tasks[0]['start']
                      ) && (
                        <TaskListItem
                          task={task}
                          labels={labels}
                          tab={tab}
                          showFinish={showFinish}
                          showDelete={showDelete}
                          setCurrTasks={setCurrTasks}
                          setPastTasks={setPastTasks}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
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
