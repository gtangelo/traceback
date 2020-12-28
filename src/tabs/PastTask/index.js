import React from 'react';
import ClockConverter from 'utils/ClockConverter';
import infoBtn from 'images/infoIcon.png';
import TaskInfoModal from '../CurrTask/TaskInfoModal';

let displayTaskInfo = false;

const PastTaskScreen = ({ tasksList }) => {

  const ToggleTaskInfo = () => {
    displayTaskInfo = !displayTaskInfo;
  };

  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };


  return (
    <div className='tab-container'>
      <div className='heading'>Past Tasks</div>
      {tasksList.length === 0 ? (
        <div>No completed tasks available to show</div>
      ) : (
        tasksList.map((task, i) => (
          <>
            <div className={!displayTaskInfo ? 'hidden' : ''}>
              <TaskInfoModal ToggleTaskInfo={ToggleTaskInfo} task={task} />
            </div>
            <div className='task-item-container' key={i}>
              <div className='task-name-container'>
                <div
                  className='task-colour'
                  style={{ backgroundColor: task.labelColour }}
                />
                <div className='task-name'>{task.name}</div>
              </div>
              <div className='play-button'>
                <h5>{ClockConverter(task.time)}</h5>
              </div>
              <div className='circle-button' onClick={ToggleTaskInfo}>
                <img className='button-img' src={infoBtn} alt='Info' />
              </div>
            </div>
          </>
        ))
      )}
    </div>
  );
};

export default PastTaskScreen
