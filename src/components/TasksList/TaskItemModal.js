import { InfoModal, ModalBackground } from 'components/Modal';
import { SubHeading, TaskTitle } from 'components/Title';
import React from 'react';
import ClockConverter from 'utils/helpers/ClockConverter';
import ConvertTimestampToDay from 'utils/helpers/ConvertTimestampToDay';
import GenerateLinearGradient from 'utils/helpers/GenerateLinearGradient';
import LabelIDToColour from 'utils/helpers/LabelIDToColour';
import LabelIDToName from 'utils/helpers/LabelIDToName';
import './index.css';

const TaskItemModal = ({ setToggleInfo, task, labels }) => {
  return (
    <div>
      <ModalBackground onClick={() => setToggleInfo((prevState) => !prevState)}/>
      <InfoModal>
        <div id='main-info-section'>
          <div className='name-container'>
            <SubHeading dark>{task.name}</SubHeading>
            <div>{task.description}</div>
            <div
              className='task-label'
              style={{ background: (LabelIDToColour(labels, task.labelID)) }}
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
      </InfoModal>
    </div>
  );
};

export default TaskItemModal;
