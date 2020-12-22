import React from 'react';
import ClockConverter from 'utils/ClockConverter';

const PastTaskScreen = ({ tasksList }) => {
  return (
    <div className='tab-container'>
      <div className='heading'>Past Tasks</div>
      {tasksList.map((task, i) => (
        <div className='task-item-container' key={i}>
          <div className='task-name-container'>
            <div className='task-colour' />
            <div className='task-name'>{task.taskName}</div>
          </div>
          <div className='play-button'>
            <h5>{ClockConverter(task.time)}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PastTaskScreen
