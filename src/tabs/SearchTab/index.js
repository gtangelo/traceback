import { TextField, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import TasksList from 'components/TasksList';
import { CURRENT_TASK_TAB, PAST_TASK_TAB } from 'utils/constants';


const SearchTab = ({
  labels,
  currTasks,
  setCurrTasks,
  pastTasks,
  totalTime,
}) => {
  const [labelID, setLabelID] = useState(-1);
  const [search, setSearch] = useState('');

  let currTasksFiltered = currTasks
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
    <div className='tab-container'>
      <div className='tracking-navbar'>
        <div className='heading'>Search</div>
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
      </div>
      <br/>
      {search === '' ? (
        <>
          {' '}
          <div className='label-colour-tag-container'>
            <Tooltip title='All' arrow>
              <div className='radio-button-container'>
                <div
                  style={{ backgroundColor: '#000000' }}
                  className={
                    labelID === -1 ? 'radio-button-on' : 'radio-button-off'
                  }
                  onClick={() => setLabelID(-1)}
                />
              </div>
            </Tooltip>
            <Tooltip title='None' arrow>
              <div className='radio-button-container'>
                <div
                  style={{ backgroundColor: '#eeeeee' }}
                  className={
                    labelID === 0 ? 'radio-button-on' : 'radio-button-off'
                  }
                  onClick={() => setLabelID(0)}
                />
              </div>
            </Tooltip>
            {labels.map((label, i) => (
              <Tooltip title={label.name} arrow>
                <div className='radio-button-container'>
                  <div
                    style={{ backgroundColor: label.colour }}
                    className={
                      labelID === label.labelID
                        ? 'radio-button-on'
                        : 'radio-button-off'
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
            <>
              <div className='heading'>Ongoing Tasks</div>
              <TasksList
                tasksList={currTasksFiltered}
                setCurrTasks={setCurrTasks}
                labels={labels}
                tab={CURRENT_TASK_TAB}
                showDelete={true}
                showFinish={true}
                totalTime={totalTime}
              />
            </>
          )}
          {pastTasksFiltered.length > 0 && (
            <>
              <div className='heading'>Previous Tasks</div>
              <TasksList
                tasksList={pastTasksFiltered}
                labels={labels}
                tab={PAST_TASK_TAB}
                totalTime={totalTime}
              />
            </>
          )}
        </>
      ) : (
        <>
          {currTasksSearch.length > 0 && (
            <>
              {/* <div className='heading'>Ongoing Tasks</div> */}
              <TasksList
                tasksList={currTasksSearch}
                setCurrTasks={setCurrTasks}
                labels={labels}
                tab={CURRENT_TASK_TAB}
                showDelete={true}
                showFinish={true}
              />
            </>
          )}
          {pastTasksSearch.length > 0 && (
            <>
              {/* <div className='heading'>Previous Tasks</div> */}
              <TasksList
                tasksList={pastTasksSearch}
                labels={labels}
                tab={PAST_TASK_TAB}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchTab
