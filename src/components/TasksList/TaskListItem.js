/* global chrome */
import React, { useState } from 'react';
import axios from 'axios';

import {
  FaInfo,
  FaPlayCircle,
  FaPauseCircle,
  FaLongArrowAltRight,
  FaBackspace,
} from 'react-icons/fa';

import TaskItemModal from './TaskItemModal';
import { TaskTitle } from 'components/styled/Title';
import {
  CircleButton,
  LongButton,
  TaskButton,
  TooltipButton,
} from 'components/styled/Button';
import {
  ItemContainer,
  ItemNameSection,
  ItemButtonSection,
} from 'components/styled/Container';

import { CURRENT_TASK_TAB, USER_ID } from 'utils/constants';
import {
  ClockConverter,
  LabelIDToColour,
  LabelIDToName,
  GenerateLinearGradient,
} from 'utils/helpers';
import {
  retrieveCurrTasks,
  retrievePastTasks,
  syncCurrTasks,
  updateTaskDatabase,
} from 'utils/api';


const TaskListItem = ({
  task,
  labels,
  tab,
  showDelete,
  showFinish,
  setCurrTasks,
  setPastTasks,
}) => {
  const [toggleInfo, setToggleInfo] = useState(false);

  const PlayPauseTask = (task) => {
    if (task.onPlay) {
      updateTaskDatabase(task['userID'], task['taskID'], task['time']);
      console.log('updated task');
    }
    chrome.storage.local.get('currTasks', ({ currTasks }) => {
      chrome.storage.local.set({
        currTasks: currTasks.map((item) =>
          item.taskID === task.taskID
            ? { ...item, onPlay: !task.onPlay }
            : item
        ),
      });
    });
  };

  const DeleteTask = (taskID) => {
    syncCurrTasks(setCurrTasks);
    axios
      .delete('/active-task/delete', {
        params: {
          userID: USER_ID,
          taskID: taskID,
        },
      })
      .then(() => {
        retrievePastTasks(setPastTasks);
      })
      .catch((e) => console.log(e));
  };

  const FinishTask = (taskID, time) => {
    syncCurrTasks(setCurrTasks);
    console.log(time);
    axios
      .put('/active-task/finish', {
        userID: USER_ID,
        taskID: taskID,
        time: time,
      })
      .then(() => {
        retrieveCurrTasks(setCurrTasks);
        retrievePastTasks(setPastTasks);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div className={!toggleInfo ? 'hide-modal' : ''}>
        <TaskItemModal
          setToggleInfo={setToggleInfo}
          task={task}
          labels={labels}
        />
      </div>
      <ItemContainer>
        <ItemNameSection
          hover
          onClick={() => setToggleInfo((prevState) => !prevState)}
        >
          <TooltipButton
            title={LabelIDToName(labels, task.labelID)}
            colour={GenerateLinearGradient(
              LabelIDToColour(labels, task.labelID)
            )}
            button={TaskButton}
          >
            <FaInfo size='12px' color='#333333' />
          </TooltipButton>
          <TaskTitle>{task.name}</TaskTitle>
        </ItemNameSection>
        {tab === CURRENT_TASK_TAB ? (
          <ItemButtonSection>
            <TooltipButton
              title='Play/Pause'
              button={LongButton}
              onClick={() => PlayPauseTask(task)}
            >
              {!task.onPlay ? (
                <FaPlayCircle size='16px' color='#333333' />
              ) : (
                <FaPauseCircle size='16px' color='#333333' />
              )}
              <h5>{ClockConverter(task.time)}</h5>
            </TooltipButton>
            {showDelete && (
              <TooltipButton
                title='Delete'
                button={CircleButton}
                onClick={() => DeleteTask(task.taskID)}
              >
                <FaBackspace size='16px' color='#333333' />
              </TooltipButton>
            )}
            {showFinish && (
              <TooltipButton
                title='Finish'
                button={CircleButton}
                onClick={() => FinishTask(task.taskID, task.time)}
              >
                <FaLongArrowAltRight size='16px' color='#333333' />
              </TooltipButton>
            )}
          </ItemButtonSection>
        ) : (
          <div className='buttons-section'>
            <LongButton style={{ cursor: 'default' }}>
              <h5>{ClockConverter(task.time)}</h5>
            </LongButton>
          </div>
        )}
      </ItemContainer>
    </div>
  );
};

export default TaskListItem;
