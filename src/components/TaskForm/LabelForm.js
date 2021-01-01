import React, {useState} from 'react';
import { TextField } from '@material-ui/core';
import './index.css';
import axios from 'axios';

const LabelForm = ({ setLabels, setToggleLabelForm }) => {
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const colour = e.target[1].value;
    const description = e.target[2].value;

    // validate if strColor is a valid CSS color i.e. red or #eeeeee
    const isColour = (strColor) => {
      const css = new Option().style;
      css.color = strColor;
      return (
        strColor.length > 0 && (
        css.color === strColor ||
        (typeof strColor === 'string' &&
          strColor.length === 7 && strColor[0] === "#" &&
          !isNaN(Number('0x' + strColor.slice(1)))))
      );
    };

    // form fields validation
    if (description.length <= 0) {
      setError('Description must be greater than 0 characters');
    }
    if (!isColour(colour)) {
      setError(
        'Colour must be a valid css colour or a hex code (i.e. #eeeeee)'
      );
    }
    if (name.length <= 0) {
      setError('Label must be greater than 0 characters');
    }

    // api request to create a new label
    if (name.length > 0 && description.length > 0 && isColour(colour)) {
      setToggleLabelForm((prevState) => !prevState);
      axios
        .post('/label/create', {
          userID: 1,
          colour: colour,
          name: name,
          description: description,
        })
        .then(({ data }) => {
          setLabels((prevState) => [
            ...prevState,
            {
              userID: 1,
              labelID: data['labelID'],
              name: name,
              colour: colour,
              description: description,
            },
          ]);
        })
        .catch((e) => console.log(e));
      e.target.reset();
    }    
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
        {error}
        <br />
        <button className='new-task-button' id='Submit' type='submit'>
          Create Label
        </button>
      </form>
    </div>
  );
};

export default LabelForm;