import React, { useState } from 'react';
import { TextField, Tooltip } from '@material-ui/core';
import TasksList from 'components/TasksList';
import { CURRENT_TASK_TAB, PAST_TASK_TAB } from 'utils/constants';
import { TabContainer, TabHeader } from 'components/TabContainer';
import { Heading } from 'components/Title';
import GenerateLinearGradient from 'utils/helpers/GenerateLinearGradient';
import { ColourButton } from 'components/Button';
import 'components/TaskForm/index.css';
import { NoneColour, AllColour } from 'utils/colours';

const SearchTab = ({
  labels,
  currTasks,
  setCurrTasks,
  pastTasks,
  totalTime,
}) => {
  const [labelID, setLabelID] = useState(-1);
  const [search, setSearch] = useState('');

  let currTasksFiltered = currTasks;
  if (labelID !== -1) {
    currTasksFiltered = currTasks.filter(
      (task) => task.labelID === labelID
    );
  }

  let pastTasksFiltered = pastTasks;
  if (labelID !== -1) {
    pastTasksFiltered = pastTasks.filter((task) => task.labelID === labelID);
  } 

  let none = '';
  if (currTasksFiltered.length === 0 && pastTasksFiltered.length === 0) {
    none = 'No ongoing or previous tasks have been assigned with this label.';
  }
  const currTasksSearch = currTasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase())
  );
  const pastTasksSearch = pastTasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TabContainer>
      <TabHeader>
        <Heading>Search</Heading>
        <TextField
          label='Search Task Name'
          id='search'
          variant='outlined'
          size='small'
          className='text-field'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </TabHeader>
      {search === '' ? (
        <div>
          <div className='label-selection'>
            <Tooltip title='All' arrow placement='top'>
              <div className='radio-btn-container'>
                <ColourButton
                  colour={GenerateLinearGradient(AllColour)}
                  selected={labelID === -1}
                  className={labelID === -1 ? 'radio-btn-on' : 'radio-btn-off'}
                  onClick={() => setLabelID(-1)}
                />
              </div>
            </Tooltip>
            <Tooltip title='None' arrow placement='top'>
              <div className='radio-btn-container'>
                <ColourButton
                  colour={GenerateLinearGradient(NoneColour)}
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
          {none}
          {currTasksFiltered.length > 0 && (
            <div>
              <Heading>Ongoing Tasks</Heading>
              <TasksList
                tasksList={currTasksFiltered}
                setCurrTasks={setCurrTasks}
                labels={labels}
                tab={CURRENT_TASK_TAB}
                totalTime={totalTime}
                showDelete
                showFinish
              />
            </div>
          )}
          {pastTasksFiltered.length > 0 && (
            <div>
              <Heading>Previous Tasks</Heading>
              <TasksList
                tasksList={pastTasksFiltered}
                labels={labels}
                tab={PAST_TASK_TAB}
                totalTime={totalTime}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          {currTasksSearch.length > 0 && (
            <TasksList
              tasksList={currTasksSearch}
              setCurrTasks={setCurrTasks}
              labels={labels}
              tab={CURRENT_TASK_TAB}
              showDelete
              showFinish
            />
          )}
          {pastTasksSearch.length > 0 && (
            <TasksList
              tasksList={pastTasksSearch}
              labels={labels}
              tab={PAST_TASK_TAB}
            />
          )}
        </div>
      )}
    </TabContainer>
  );
};

export default SearchTab;
