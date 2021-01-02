import React, {useState} from 'react';
import { TextField } from '@material-ui/core';
import './index.css';
import axios from 'axios';
import colours from 'utils/colours';

const LabelForm = ({ setLabels, setToggleLabelForm }) => {
  const [error, setError] = useState("")
  const [colourCode, setColourCode] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const description = e.target[1].value;

    // form fields validation
    if (description.length <= 0) {
      setError('Description must be greater than 0 characters');
    }
    if (colourCode === null) {
      setError('Colour tag must be selected');
    }
    if (name.length <= 0) {
      setError('Label must be greater than 0 characters');
    }

    // api request to create a new label
    if (name.length > 0 && description.length > 0 && colourCode != null) {
      setToggleLabelForm((prevState) => !prevState);
      axios
        .post('/label/create', {
          userID: 1,
          colour: colourCode,
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
              colour: colourCode,
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
          <TextField
            id='labelDescription'
            type='text'
            placeholder='Label Description'
          />
        </div>
        Select Colour Tag
        <div className='label-selection'>
          {colours.map((colour) => (
            <div className='radio-button-container'>
              <div
                style={{ backgroundColor: colour }}
                className={
                  colourCode === colour ? 'radio-button-on' : 'radio-button-off'
                }
                onClick={() => setColourCode(colour)}
              />
            </div>
          ))}
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