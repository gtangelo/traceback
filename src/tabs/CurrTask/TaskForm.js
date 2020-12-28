import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import './TaskForm.css'

import cancelBtn from 'images/deleteIcon.png'
import { URL } from 'globals';
import axios from 'axios';

const LabelForm = ({labels, setLabels}) => {
  const [labelName, setLabelName] = useState('');
  const [labelColour, setLabelColour] = useState('');

  const AddLabel = () => {
    let labelID = 1;
    if (labels.length !== 0) {
      labelID = labels[labels.length - 1].id + 1;
    }
    const newLabel = {
      id: labelID,
      colour: labelColour,
      name: labelName,
    };
    setLabels([...labels, newLabel])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (labelName !== '' && labelColour !== '') {
      AddLabel()
      setLabelName('')
      setLabelColour('')
      e.target.reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex-container'>
          <TextField
            id='task'
            type='text'
            onChange={(e) => setLabelName(e.target.value)}
            placeholder='Label Name'
          />
          <TextField
            id='description'
            type='text'
            onChange={(e) => setLabelColour(e.target.value)}
            placeholder='Label Colour'
          />
        </div>
        <br />
        <button className='new-task-button' id='Submit' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}

const TaskForm = ({ ToggleTaskForm, labels, setLabels, setTasksList }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [labelID, setLabelID] = useState(0);
  const [time, setTime] = useState(0);

  const CreateTask = async (e) => {
    e.preventDefault();
    if (taskName !== '' && taskDescription !== '') {
      ToggleTaskForm();
      axios
        .post(
          URL + '/active-task/create',
          {
            userID: 1,
            labelID: labelID,
            name: taskName,
            description: taskDescription,
          }
        )
        .then(({ data }) => {
          const taskID = data['taskID'];
          setTasksList((prevState) => [
            ...prevState,
            {
              userID: 1,
              taskID: taskID,
              labelID: labelID,
              time: 0,
              name: taskName,
              description: taskDescription,
              onPlay: false,
            },
          ]);
        })
        .catch((e) => console.log(e));
      setTaskName('');
      setTaskDescription('');
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
        <form onSubmit={CreateTask}>
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
          <input
            type='radio'
            name='category'
            value='none'
            id={0}
            onChange={() => setLabelID(0)}
            defaultChecked
          />
          <label for='none'>None</label>
          {labels.map((label) => (
            <div style={{ backgroundColor: label.colour }}>
              <input
                type='radio'
                name='category'
                value={label.id}
                id={label.id}
                onChange={() => setLabelID(label.id)}
              />
              <label for={label.id}>{label.name}</label>
            </div>
          ))}
          <button className='new-task-button' id='Submit' type='submit'>
            Submit
          </button>
        </form>
        <LabelForm labels={labels} setLabels={setLabels} />
      </div>
    </div>
  );
};

export default TaskForm;
