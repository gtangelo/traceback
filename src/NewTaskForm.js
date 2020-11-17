import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';

const NewTaskForm = (props) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName !== '' && taskDescription !== '') {
      props.AddNewTask(taskName, taskDescription);
      e.target.reset();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
      <Button variant='contained' id='Submit' type='submit'>
        Submit
      </Button>
    </form>
  );
}

export default NewTaskForm

