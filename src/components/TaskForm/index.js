import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import cancelBtn from 'images/deleteIcon.png';
import './index.css';
import LabelForm from './LabelForm';


const TaskForm = ({ ToggleTaskForm, labels, setLabels, setTasksList }) => {
  const [labelID, setLabelID] = useState(0);
  const [toggleLabelForm, setToggleLabelForm] = useState(false);


  // Add a new task to both dynamodb database and local state
  const CreateTask = (e) => {
    e.preventDefault();
    ToggleTaskForm();
    const name = e.target[0].value;
    const description = e.target[1].value;
    axios
      .post('/active-task/create', {
        userID: 1,
        labelID: labelID,
        name: name,
        description: description,
      })
      .then(({ data }) => {
        const taskID = data['taskID'];
        const start = data['start'];
        setTasksList((prevState) => [
          {
            userID: 1,
            taskID: taskID,
            labelID: labelID,
            time: 0,
            name: name,
            description: description,
            start: start,
            onPlay: false,
          },
          ...prevState,
        ]);
      })
      .catch((e) => console.log(`/active-task/create - ${e}`));
    e.target.reset();
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
        <form onSubmit={CreateTask}>
          <div className='flex-container'>
            <TextField id='taskName' type='text' placeholder='Task Name' />
            <TextField
              id='taskDescription'
              type='text'
              placeholder='Task Description'
            />
          </div>
          <br />
          {/* <input
            type='checkbox'
            onChange={() => setManualTime((state) => !state)}
          />
          <div className={manualTime ? '' : 'hidden'}>
            <TextField
              id='time'
              type='text'
              onChange={(e) => setTime(e.target.value)}
              placeholder='Manual Time'
            />
          </div> */}
          <div className='sub-heading'>Labels Selection</div>
          <div className='label-selection'>
            <Tooltip title='None' arrow>
              <div
                style={{ backgroundColor: '#eeeeee' }}
                className={
                  labelID === 0 ? 'radio-button-on' : 'radio-button-off'
                }
                onClick={() => setLabelID(0)}
              />
            </Tooltip>
            {labels.map((label, i) => (
              <Tooltip title={label.name} arrow>
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
              </Tooltip>
            ))}
            <Tooltip title='Add Label' arrow>
              <div
                style={{ backgroundColor: '#eeeeee' }}
                className='radio-button-off'
                onClick={() => setToggleLabelForm((prevState) => !prevState)}
              >
                <AddIcon style={{ color: '#000000' }} />
              </div>
            </Tooltip>
          </div>
          <br />
          <button className='new-task-button' id='Submit' type='submit'>
            Submit
          </button>
        </form>
        <div className={toggleLabelForm ? 'display' : 'hidden'}>
          <LabelForm labels={labels} setLabels={setLabels} />
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
