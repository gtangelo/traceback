import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import ConvertToClock from './CovertToClock'


const PastTaskList = (props) => {
  return props.tasks.map((task, i) => {
    return (
      <div key={i} className='taskContainer'>
        <div>
          <div className='taskNameHeading'>{task.taskName}</div>
          <div className='timeHeading'>{ConvertToClock(task.time)}</div>
        </div>
      </div>
    );
  }) 
}

const PastTaskScreen = (props) => {
  return (
    <div className='main-content'>
      <div className='titleHeader'>Past Tasks</div>
      <PastTaskList tasks={props.tasks} />
    </div>
  );
}

export default PastTaskScreen
