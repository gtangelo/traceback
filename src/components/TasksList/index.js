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
      {timeLogs.map((timeLog) => (
        <>
          {showDate && (
            <div className='date-section'>
              <SubHeading>{ConvertTimestampToDay(timeLog['date'])}</SubHeading>
              {CompareTimestamps(timeLog['date']) ? (
                <div>{ClockConverter(totalTime)}</div>
              ) : (
                <div>{ClockConverter(timeLog['time'])}</div>
              )}
            </div>
          )}
          {tasksDayList.map((tasks, i) => (
            <div key={i}>
              {tasks.map((task, i) => (
                <>
                  {CompareTimestamps(timeLog['date'], tasks[0]['start']) && (
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
                </>
              ))}
            </div>
          ))}
        </>
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
