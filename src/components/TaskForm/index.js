/* global chrome */
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import cancelBtn from 'images/deleteIcon.png';
import './index.css';
import LabelForm from './LabelForm';
import retrieveCurrTasks from 'utils/helpers/retrieveCurrTasks';


const TaskForm = ({ ToggleTaskForm, labels, setLabels, setCurrTasks }) => {
  const [labelID, setLabelID] = useState(0);
  const [toggleLabelForm, setToggleLabelForm] = useState(false);
  const [time, setTime] = useState(0);
  const [toggleManualTime, setToggleManualTime] = useState(false);
  const [error, setError] = useState('');

  // Add a new task to both dynamodb database and local state
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const description = e.target[1].value;

    // form fields validation
    if (description.length <= 0) {
      setError('Description must be greater than 0 characters');
    }
    if (name.length <= 0) {
      setError('Label must be greater than 0 characters');
    }
    if (!/^\d*$/.test(time) || time < 0) {
      setError('Time must be an integer value and be greater than 0');
    }

    if (
      name.length > 0 &&
      description.length > 0 &&
      /^\d*$/.test(time) &&
      time >= 0
    ) {
      ToggleTaskForm();
      axios
        .post('/active-task/create', {
          userID: 1,
          labelID: labelID,
          name: name,
          description: description,
          time: time,
        })
        .then(() => {
          retrieveCurrTasks(setCurrTasks);
        })
        .catch((e) => console.log(e));
      e.target.reset();
    }
  };

  return (
    <div>
      <div className='modal-background' onClick={ToggleTaskForm} />
      <div className='form-modal'>
        <div className='tracking-navbar'>
          <div className='sub-heading'>Create New Task</div>
          <img
            className='button-img'
            src={cancelBtn}
            alt='Exit'
            onClick={ToggleTaskForm}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex-container'>
            <TextField id='taskName' type='text' placeholder='Task Name' />
            <TextField
              id='taskDescription'
              type='text'
              placeholder='Task Description'
            />
          </div>
          <br />
          <div className='flex-container'>
            <label>
              <input
                type='checkbox'
                onChange={() => setToggleManualTime((prevState) => !prevState)}
              />
              Set Manual Time
            </label>
            <div className={toggleManualTime ? '' : 'hidden'}>
              <TextField
                id='time'
                type='text'
                onChange={(e) => setTime(e.target.value)}
                placeholder='Manual Time'
              />
            </div>
          </div>
          <div className='sub-heading'>Labels Selection</div>
          <div className='label-selection'>
            <Tooltip title='None' arrow>
              <div className='radio-button-container'>
                <div
                  style={{ backgroundColor: '#eeeeee' }}
                  className={
                    labelID === 0 ? 'radio-button-on' : 'radio-button-off'
                  }
                  onClick={() => setLabelID(0)}
                />
              </div>
            </Tooltip>
            {labels.map((label, i) => (
              <Tooltip title={label.name} arrow>
                <div className='radio-button-container'>
                  <div
                    style={{ backgroundColor: label.colour }}
                    className={
                      labelID === label.labelID
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    key={i}
                    onClick={() => setLabelID(label.labelID)}
                  />
                </div>
              </Tooltip>
            ))}
            <Tooltip title='Add Label' arrow>
              <div
                style={{ backgroundColor: '#eeeeee' }}
                className='radio-button-on'
                onClick={() => setToggleLabelForm((prevState) => !prevState)}
              >
                <AddIcon style={{ color: '#000000' }} />
              </div>
            </Tooltip>
          </div>
          <br />
          {error}
          <button className='new-task-button' id='Submit' type='submit'>
            Add Task
          </button>
        </form>
        <div className={toggleLabelForm ? 'display' : 'hidden'}>
          <LabelForm
            labels={labels}
            setLabels={setLabels}
            setToggleLabelForm={setToggleLabelForm}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
