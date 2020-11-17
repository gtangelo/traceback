import { Button } from '@material-ui/core';
import React from 'react'
import ConvertToClock from './CovertToClock';
import './index.css';

const CurrTaskList = (props) => {
  let tasksList = props.tasks.map((task, i) => (
    <div key={i} className='taskContainer'>
      <div>
        <div className='taskNameHeading'>{task.taskName}</div>
        <div className='timeHeading'>{ConvertToClock(task.time)}</div>
      </div>
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.PlayPauseTask(task.isPlaying, task.taskID)}
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 5,
            width: 90,
            height: 25,
          }}
        >
          {!task.isPlaying ? 'Play' : 'Pause'}
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => props.DeleteTask(task.taskID)}
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 5,
            width: 90,
            height: 25,
          }}
        >
          Delete
        </Button>
        {/* replace this with finish function*/}
        <Button
          variant='contained'
          onClick={() => props.FinishTask(task.taskID)}
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 5,
            width: 90,
            height: 25,
            backgroundColor: 'green',
            color: 'white'
          }}
        >
          Finish
        </Button>
      </div>
    </div>
  ));

  return (
    <div>
      <div className='titleHeader'>Current Tasks</div>
      <div className='tasksListContainer'>{tasksList}</div>
    </div>
  );
}

export default CurrTaskList
