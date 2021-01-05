import React, {useState} from 'react';
import { TextField } from '@material-ui/core';
import './index.css';
import axios from 'axios';
import colours from 'utils/colours';

const LabelForm = ({ setLabels, setToggleLabelForm }) => {
  const [error, setError] = useState("")
  const [colourCode, setColourCode] = useState(null);
  const [name, setName] = useState("")

  const handleSubmit = () => {
    // form fields validation
    if (colourCode === null) {
      setError('Colour tag must be selected');
    }
    if (name.length <= 0) {
      setError('Label must be greater than 0 characters');
    }

    // api request to create a new label
    if (name.length > 0 && colourCode != null) {
      setToggleLabelForm((prevState) => !prevState);
      axios
        .post('/label/create', {
          userID: 1,
          colour: colourCode,
          name: name,
        })
        .then(({ data }) => {
          setLabels((prevState) => [
            ...prevState,
            {
              userID: 1,
              labelID: data['labelID'],
              name: name,
              colour: colourCode,
            },
          ]);
          setName("")
          setColourCode(null)
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div className='label-form-container'>
      <div className='field-section'>
        <TextField
          id='labelName'
          type='text'
          placeholder='Label Name'
          className='text-field'
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      Select Tag
      <div className='label-colour-tag-container'>
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
      <button className='new-task-button' onClick={handleSubmit}>
        Create Label
      </button>
    </div>
  );
};

export default LabelForm;