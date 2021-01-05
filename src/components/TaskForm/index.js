import React, { useState } from 'react';
import axios from 'axios';
import TimeField from 'react-simple-timefield';
import { FormControlLabel, Switch, TextField, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './index.css';
import LabelForm from './LabelForm';
import syncCurrTasks from 'utils/helpers/syncCurrTasks';
import { ModalBackground, FormModal } from 'components/Modal';
import { CircleButton, AddButton, ColourButton } from 'components/Button';

import { FaTimes } from 'react-icons/fa';
import { SubHeading } from 'components/Title/';
import { TabHeader } from 'components/TabContainer';
import GenerateLinearGradient from 'utils/helpers/GenerateLinearGradient';
import { FaPlus } from 'react-icons/fa';

const TaskForm = ({ setToggleForm, labels, setLabels, setCurrTasks }) => {
  const [labelID, setLabelID] = useState(0);
  const [toggleLabelForm, setToggleLabelForm] = useState(false);
  const [error, setError] = useState('');
  const [time, setTime] = useState('00:00:00');
  const [disable, setDisable] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Add a new task to both dynamodb database and local state
  const handleSubmit = () => {
    let timeFields = time.split(':'); // split it at the colons
    let timeInSeconds =
      parseInt(timeFields[0]) * 60 * 60 +
      parseInt(timeFields[1]) * 60 +
      parseInt(timeFields[2]);

    // form fields validation
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
          setName("");
          setDescription("");
        })
        .catch((e) => console.log(e));
    } else {
      setError('Missing Fields');
      if (description.length <= 0) {
        setError('Description must be greater than 0 characters');
      }
      if (name.length <= 0) {
        setError('Label must be greater than 0 characters');
      }
    }
  };

  return (
    <div>
      <ModalBackground
        onClick={() => setToggleForm((prevState) => !prevState)}
      />
      <FormModal>
        <TabHeader>
          <SubHeading dark>Create New Task</SubHeading>
          <CircleButton
            onClick={() => setToggleForm((prevState) => !prevState)}
          >
            <FaTimes size='16px' color='#333333' />
          </CircleButton>
        </TabHeader>
        <br />
        <TabHeader>
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
        </TabHeader>
        <br />
        <TabHeader>
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
        </TabHeader>
        <SubHeading dark>Labels Selection</SubHeading>
        <div className='label-selection-container'>
          <div className='labels-section'>
            <div className='label-selection'>
              <Tooltip title='None' arrow placement='top'>
                <div className='radio-btn-container'>
                  <ColourButton
                    colour={GenerateLinearGradient('#eeeeee')}
                    selected={labelID === 0}
                    className={labelID === 0 ? 'radio-btn-on' : 'radio-btn-off'}
                    onClick={() => setLabelID(0)}
                  />
                </div>
              </Tooltip>
              {labels.map((label, i) => (
                <Tooltip title={label.name} arrow placement='top'>
                  <div className='radio-btn-container'>
                    <ColourButton
                      colour={GenerateLinearGradient(label.colour)}
                      selected={labelID === label.labelID}
                      className={
                        labelID === label.labelID
                          ? 'radio-btn-on'
                          : 'radio-btn-off'
                      }
                      key={i}
                      onClick={() => setLabelID(label.labelID)}
                    />
                  </div>
                </Tooltip>
              ))}
            </div>
            <div id='add-label-button'>
              <Tooltip title='Add Label' arrow placement='top'>
                <ColourButton
                  colour={GenerateLinearGradient('#eeeeee')}
                  className='radio-btn-on'
                  selected
                  onClick={() => setToggleLabelForm((prevState) => !prevState)}
                >
                  <FaPlus color='#333333' size='12px' />
                </ColourButton>
              </Tooltip>
            </div>
          </div>
          <div className={toggleLabelForm ? 'display-form' : 'hide-form'}>
            <LabelForm
              labels={labels}
              setLabels={setLabels}
              setToggleLabelForm={setToggleLabelForm}
            />
          </div>
        </div>
        <br />
        {error}
        <AddButton onClick={handleSubmit} style={{ float: 'right' }}>
          <FaPlus size='12px' color='#333333' />
          <h5>Create Task</h5>
        </AddButton>
      </FormModal>
    </div>
  );
};

export default TaskForm;
