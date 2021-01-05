import React, { useState } from 'react';
import axios from 'axios';
import TimeField from 'react-simple-timefield';
import { FormControlLabel, Switch, TextField, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import cancelBtn from 'images/deleteIcon.png';
import './index.css';
import LabelForm from './LabelForm';
import syncCurrTasks from 'utils/helpers/syncCurrTasks';

const TaskForm = ({ setToggleForm, labels, setLabels, setCurrTasks }) => {
  const [labelID, setLabelID] = useState(0);
  const [toggleLabelForm, setToggleLabelForm] = useState(false);
  const [error, setError] = useState('');
  const [time, setTime] = useState('00:00:00');
  const [disable, setDisable] = useState(false);
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  // Add a new task to both dynamodb database and local state
  const handleSubmit = () => {
    let timeFields = time.split(':'); // split it at the colons
    let timeInSeconds =
      parseInt(timeFields[0]) * 60 * 60 +
      parseInt(timeFields[1]) * 60 +
      parseInt(timeFields[2]);

    // form fields validation
    if (description.length <= 0) {
      setError('Description must be greater than 0 characters');
    }
    if (name.length <= 0) {
      setError('Label must be greater than 0 characters');
    }

    if (name.length > 0 && description.length > 0) {
      setToggleForm(prevState => !prevState);
      axios
        .post('/active-task/create', {
          userID: 1,
          labelID: labelID,
          name: name,
          description: description,
          time: timeInSeconds,
        })
        .then(() => {
          syncCurrTasks(setCurrTasks);
          setName("")
          setDescription("")
        })
        .catch((e) => console.log(e));
    } else {
      setError('Missing Fields');
    }
  };

  return (
    <div>
      <div
        className='modal-background'
        onClick={() => setToggleForm((prevState) => !prevState)}
      />
      <div className='form-modal'>
        <div className='tracking-navbar'>
          <div className='sub-heading'>Create New Task</div>
          <img
            className='button-img'
            src={cancelBtn}
            alt='Exit'
            onClick={() => setToggleForm((prevState) => !prevState)}
          />
        </div>
        {/* <form onSubmit={handleSubmit}> */}
        <br />
        <div className='field-section'>
          <TextField
            id='taskName'
            label='Task Name'
            variant='outlined'
            size='small'
            className='text-field'
            placeholder='Name'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id='taskDescription'
            label='Description'
            variant='outlined'
            size='small'
            className='text-field'
            placeholder='Description'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <br />
        <div className='field-section'>
          <div className='text-field flex-container'>
            <FormControlLabel
              control={
                <Switch
                  checked={disable}
                  onChange={() => setDisable((prevState) => !prevState)}
                  name='setTime'
                  color='primary'
                />
              }
              label='Set Time'
            />
          </div>
          <div>
            <TimeField
              value='00:00:00'
              input={
                <TextField
                  label='Time'
                  id='time'
                  variant='outlined'
                  size='small'
                  className='text-field'
                  disabled={!disable}
                />
              }
              onChange={(e) => setTime(e.target.value)}
              showSeconds={true}
            />
          </div>
        </div>
        <div className='sub-heading'>Labels Selection</div>
        <div className='label-selection'>
          <div className='label-selection-row'>
            <div className='label-selection-container'>
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
            </div>
            <div id='add-label-button'>
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
          </div>
          <div className={toggleLabelForm ? 'label-form' : 'hidden'}>
            <LabelForm
              labels={labels}
              setLabels={setLabels}
              setToggleLabelForm={setToggleLabelForm}
            />
          </div>
        </div>
        <br />
        {error}
        <button
          className='new-task-button'
          id='Submit'
          type='submit'
          onClick={handleSubmit}
        >
          Add Task
        </button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default TaskForm;
