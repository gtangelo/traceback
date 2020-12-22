import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import './TaskForm.css'

import cancelBtn from 'images/deleteIcon.png'

const TaskForm = ({ DisplayTaskForm, AddNewTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [labelID, setLabelID] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName !== '' && taskDescription !== '') {
      AddNewTask(taskName, taskDescription, labelID);
      setTaskName('')
      setTaskDescription('')
      e.target.reset();
      DisplayTaskForm();
    }
  };

  return (
    <div>
      <div className='modal-background' onClick={DisplayTaskForm} />
      <div className='form-modal'>
        <div className='tracking-navbar'>
          <div className='sub-heading'>Create New Task</div>
          <img
            className='button-img'
            src={cancelBtn}
            alt='Exit'
            onClick={DisplayTaskForm}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex-container'>
            <TextField
              id='task'
              type='text'
              onChange={(e) => setTaskName(e.target.value)}
              placeholder='Task Name'
            />
            <TextField
              id='description'
              type='text'
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder='Task Description'
            />
          </div>
          <br/>
          <div className='sub-heading'>Labels Selection</div>
          <button className='new-task-button' id='Submit' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
