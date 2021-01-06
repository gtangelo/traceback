import React from 'react';
import './index.css';

import { SubHeading } from 'components/styled/Title';
import { InfoModal, ModalBackground } from 'components/styled/Modal';
import {
  ClockConverter, ConvertTimestampToDay, LabelIDToColour, LabelIDToName
} from 'utils/helpers';

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
