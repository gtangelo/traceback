import React from 'react';
import ClockConverter from 'utils/helpers/ClockConverter';
import ConvertTimestampToDay from 'utils/helpers/ConvertTimestampToDay';
import LabelIDToColour from 'utils/helpers/LabelIDToColour';
import LabelIDToName from 'utils/helpers/LabelIDToName';
import './index.css';

const TaskInfoModal = ({ setToggleInfo, task, labels }) => {
  return (
    <div>
      <div className='modal-background' onClick={() => setToggleInfo(prevState => !prevState)} />
      <div className='info-modal'>
        <div id='main-info-section'>
          <div className='name-container'>
            <div className='task-name'>{task.name}</div>
            <div className='task-description'>{task.description}</div>
            <div
              className='task-label'
              style={{ backgroundColor: LabelIDToColour(labels, task.labelID) }}
            >
              {LabelIDToName(labels, task.labelID)}
            </div>
          </div>
          <div className='time-container'>{ClockConverter(task.time)}</div>
        </div>
        <br />
        <div id='date-info-section'>
          <div className='date-container'>
            <div className='title'>Task Created on</div>
            <div className='response'>{ConvertTimestampToDay(task.start)}</div>
          </div>
          <div className='date-container'>
            <div className='title'>
              {task.end ? 'Task Ended on' : 'Task Status'}
            </div>
            <div className='response'>
              {task.end ? ConvertTimestampToDay(task.end) : 'Ongoing Task'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInfoModal;
