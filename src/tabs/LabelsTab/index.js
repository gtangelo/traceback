import React, { useState } from 'react';
import axios from 'axios';
import { FaBackspace, FaPlusCircle } from 'react-icons/fa';

import LabelForm from 'components/TaskForm/LabelForm';

import { ModalBackground, FormModal } from 'components/Modal';
import { TabContainer, TabHeader } from 'components/TabContainer';
import { Heading } from 'components/Title';
import { ItemContainer, ItemNameSection, ItemButtonSection } from 'components/Container';
import { TaskButton, TooltipButton, CircleButton, AddButton } from 'components/Button';

import LabelIDToColour from 'utils/helpers/LabelIDToColour';
import retrieveLabels from 'utils/helpers/retrieveLabels';
import GenerateLinearGradient from 'utils/helpers/GenerateLinearGradient';


const LabelsTab = ({ labels, setLabels }) => {
  const [toggleForm, setToggleForm] = useState(false);

  // API delete request to delete the specified label in the dynamodb database 
  // and local state
  const DeleteLabel = labelID => {
    axios.delete('/label/delete', {
      params: {
        userID: 1,
        labelID: labelID
      }
    }).then(() => {
      retrieveLabels(setLabels);
    }).catch(e => console.log(e));
  };

  return (
    <TabContainer>
      {toggleForm && (
        <div>
          <ModalBackground
            onClick={() => setToggleForm((prevState) => !prevState)}
          />
          <FormModal>
            <LabelForm
              setToggleLabelForm={() =>
                setToggleForm((prevState) => !prevState)
              }
              labels={labels}
              setLabels={setLabels}
            />
          </FormModal>
        </div>
      )}
      <TabHeader>
        <Heading>Labels</Heading>
        <AddButton onClick={() => setToggleForm((prevState) => !prevState)}>
          <FaPlusCircle size='20px' color='#333333' />
          <h5>Add Label</h5>
        </AddButton>
      </TabHeader>
      <br />
      <div>
        <ItemContainer>
          <ItemNameSection>
            <TaskButton
              colour={GenerateLinearGradient(LabelIDToColour(labels, 0))}
            />
            <div className='task-name'>None</div>
          </ItemNameSection>
        </ItemContainer>
      </div>
      {labels.map((label, i) => (
        <ItemContainer key={i}>
          <ItemNameSection>
            <TaskButton
              colour={GenerateLinearGradient(
                LabelIDToColour(labels, label.labelID)
              )}
            />
            <div className='task-name'>{label.name}</div>
          </ItemNameSection>
          <ItemButtonSection>
            <TooltipButton
              title='Delete'
              button={CircleButton}
              onClick={() => DeleteLabel(label.labelID)}
            >
              <FaBackspace size='16px' color='#333333' />
            </TooltipButton>
          </ItemButtonSection>
        </ItemContainer>
      ))}
    </TabContainer>
  );
};

export default LabelsTab;
