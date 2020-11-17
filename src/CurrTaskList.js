import { Button } from '@material-ui/core';
import React from 'react'
import ConvertToClock from './CovertToClock';


const CurrTaskList = (props) => {
  return props.tasks.map((task, i) => (
    <div key={i}>
      <h1>Task: {task.taskName}</h1>
      <h3>Time: {ConvertToClock(task.time)}</h3>
      <p>Description: {task.description}</p>
      <Button
        variant='contained'
        onClick={() => props.PlayPauseTask(task.isPlaying, task.taskID)}
      >
        {!task.isPlaying ? 'Play' : 'Pause'}
      </Button>
      <Button variant='contained' onClick={() => props.DeleteTask(task.taskID)}>
        Delete
      </Button>
      {/* replace this with finish function*/}
      <Button variant='contained' onClick={() => props.FinishTask(task.taskID)}>
        Finish
      </Button>
    </div>
  ));
}

export default CurrTaskList
