import React from 'react';
import ClockConverter from 'utils/helpers/ClockConverter';
import './index.css';

const TaskInfoModal = ({ ToggleTaskInfo, task }) => {
  return (
    <div>
      <div className='modal-background' onClick={ToggleTaskInfo} />
      <div className='info-modal'>
        <div className='task-info-container'>
          <div className='task-info-heading'>Task</div>
          <div className='task-info-content'>{task.name}</div>
        </div>
        <div className='task-info-container'>
          <div className='task-info-heading'>Description</div>
          <div className='task-info-content'>{task.description}</div>
        </div>
        <div className='task-info-container'>
          <div className='task-info-heading'>Total Time</div>
          <div className='task-info-content'>{ClockConverter(task.time)}</div>
        </div>
        <div className='task-info-container'>
          <div className='task-info-heading'>Label</div>
          <div className='task-info-content'>{task.labelID}</div>
        </div>
        <div className='task-info-container'>
          <div className='task-info-heading'>Start Date</div>
          <div className='task-info-content'>
            {task.start}
          </div>
        </div>
        {task.end && (
          <div className='task-info-container'>
            <div className='task-info-heading'>End Date</div>
            <div className='task-info-content'>
              {task.end}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskInfoModal;
