import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

import { FaPlus } from 'react-icons/fa';
import { TextField } from '@material-ui/core';

import { AddButton, ColourButton } from 'components/styled/Button';
import { SubHeading } from 'components/styled/Title';
import colours from 'utils/colours';
import { USER_ID } from 'utils/constants';
import { GenerateLinearGradient } from 'utils/helpers';

const LabelForm = ({ setLabels, setToggleLabelForm }) => {
  const [error, setError] = useState("");
  const [colourCode, setColourCode] = useState(null);
  const [name, setName] = useState("");

  const handleSubmit = () => {
    // API post request to create a new label to be sent in the dynamodb database
    if (name.length > 0 && colourCode != null) {
      setToggleLabelForm((prevState) => !prevState);
      axios
        .post('/label/create', {
          userID: USER_ID,
          colour: colourCode,
          name: name,
        })
        .then(({ data }) => {
          setLabels((prevState) => [
            ...prevState,
            {
              userID: USER_ID,
              labelID: data['labelID'],
              name: name,
              colour: colourCode,
            },
          ]);
          setName("");
          setColourCode(null);
        })
        .catch((e) => console.log(e));
    } else {
      setError("Missing Fields");
      if (colourCode === null) {
        setError('Colour tag must be selected');
      }
      if (name.length <= 0) {
        setError('Label must be greater than 0 characters');
      }
    }
  };

  console.log(GenerateLinearGradient(colours[0]));
  return (
    <div style={{ width: '100%' }}>
      <TextField
        id='labelName'
        type='text'
        placeholder='Label Name'
        className='text-field'
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <SubHeading dark>Select Colour</SubHeading>
      <div className='label-colours-section'>
        {colours.map((colour) => (
          <div className='radio-btn-container'>
            <ColourButton
              colour={GenerateLinearGradient(colour)}
              className={
                colourCode === colour ? 'radio-btn-on' : 'radio-btn-off'
              }
              selected={colourCode === colour}
              onClick={() => setColourCode(colour)}
            />
          </div>
        ))}
      </div>
      {error}
      <AddButton onClick={handleSubmit} style={{float: 'right'}}>
        <FaPlus size='12px' color='#333333' />
        <h5>Create Label</h5>
      </AddButton>
    </div>
  );
};

export default LabelForm;