import axios from 'axios';
import LabelForm from 'components/TaskForm/LabelForm';
import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineInfo, AiFillDelete } from 'react-icons/ai';
import retrieveLabels from 'utils/helpers/retrieveLabels';

const LabelsTab = ({ labels, setLabels }) => {
  const [toggleForm, setToggleForm] = useState(false)

  const DeleteLabel = labelID => {
    axios.delete('/label/delete', {
      params: {
        userID: 1,
        labelID: labelID
      }
    }).then(() => {
      retrieveLabels(setLabels)
    }).catch(e => console.log(e))
  }

  const labelForm = toggleForm && (
    <div>
      <div
        className='modal-background'
        onClick={() => setToggleForm((prevState) => !prevState)}
      />
      <div className='form-modal'>
        <LabelForm
          setToggleLabelForm={() => setToggleForm((prevState) => !prevState)}
          labels={labels}
          setLabels={setLabels}
        />
      </div>
    </div>
  );

  return (
    <div className='tab-container'>
      {labelForm}
      <div className='tracking-navbar'>
        <div className='heading'>Labels</div>
        <div
          className='new-task-button'
          onClick={() => setToggleForm((prevState) => !prevState)}
        >
          <AiOutlinePlus size='20px' color='#333333' />
          <h5>Add Label</h5>
        </div>
      </div>
      {labels.length === 0 ? (
        <div>No labels available to show</div>
      ) : (
        labels.map((label, i) => (
          <div key={i}>
            <div className='task-item-container'>
              <div className='task-name-container'>
                <div
                  className='task-colour'
                  style={{
                    backgroundColor: label.colour,
                  }}
                />
                <div className='task-name'>{label.name}</div>
              </div>
              <div className='buttons-container'>
                <div
                  className='circle-button'
                  onClick={() => DeleteLabel(label.labelID)}
                >
                  <AiFillDelete size='20px' color='#333333' />
                </div>
                <div
                  className='circle-button'
                  // onClick={() => setToggleInfo((prevState) => !prevState)}
                >
                  <AiOutlineInfo size='20px' color='#333333' />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default LabelsTab
