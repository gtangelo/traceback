import React from 'react'
import { AiOutlineInfo, AiFillDelete } from 'react-icons/ai';

const LabelsTab = ({ labels }) => {
  return (
    <div className='tab-container'>
      <div className='heading'>Labels</div>
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
                  // onClick={() => DeleteTask(task.taskID)}
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
