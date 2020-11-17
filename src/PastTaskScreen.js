import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import ConvertToClock from './CovertToClock'


const PastTaskList = (props) => {
  return props.tasks.map((task, i) => {
    return (
      <div key={i}>
        <h1>Task: {task.taskName}</h1>
        <h3>Time: {ConvertToClock(task.time)}</h3>
        <p>Description: {task.description}</p>
      </div>
    );
  }) 
}

const PastTaskScreen = (props) => {
  return (
    <div>
      Past Tasks
      <PastTaskList tasks={props.tasks}/>
    </div>
  )
}

export default PastTaskScreen
