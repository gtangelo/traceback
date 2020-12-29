import React from 'react';
import { TextField } from '@material-ui/core';
import './index.css';

const LabelForm = ({ labels, setLabels }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    let name = e.target[0].value;
    let colour = e.target[1].value;
    let description = e.target[2].value;

    // generates unique labelID
    let labelID = 1;
    if (labels.length !== 0) {
      labelID = labels[labels.length - 1].labelID + 1;
    }
    
    setLabels((prevState) => [
      ...prevState,
      {
        labelID: labelID,
        name: name,
        colour: colour,
        description: description,
      },
    ]);

    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex-container'>
          <TextField id='labelName' type='text' placeholder='Label Name' />
          <TextField id='labelColour' type='text' placeholder='Label Colour' />
          <TextField
            id='labelDescription'
            type='text'
            placeholder='Label Description'
          />
        </div>
        <br />
        <button className='new-task-button' id='Submit' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LabelForm;