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
  const [labelID, setLabelID] = useState(0);
  const [labelData, setLabelData] = useState('');
  const [search, setSearch] = useState('');

  const currTasksFiltered = currTasks.filter(
    (task) => task.labelID === labelID
  );
  const pastTasksFiltered = pastTasks.filter(
    (task) => task.labelID === labelID
  );
  let none = '';
  if (currTasksFiltered.length === 0 && pastTasksFiltered.length === 0) {
    none = 'No ongoing or previous tasks have been assigned with this label.';
  }
  const currTasksSearch = currTasks.filter((task) =>
    task.name.includes(search)
  );
  const pastTasksSearch = pastTasks.filter((task) =>
    task.name.includes(search)
  );
  return (
    <div className='tab-container'>
      <div className='tracking-navbar'>
        <div className='heading'>Search</div>
        <TextField
          label='Search Task Name'
          id='outlined-size-small'
          variant='outlined'
          size='small'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search === '' ? (
        <>
          {' '}
          <div className='label-selection'>
            <Tooltip title='None' arrow>
              <div className='radio-button-container'>
                <div
                  style={{ backgroundColor: '#eeeeee' }}
                  className={
                    labelID === 0 ? 'radio-button-on' : 'radio-button-off'
                  }
                  onClick={() => {
                    setLabelID(0);
                    setLabelData({});
                  }}
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
                    onClick={() => {
                      setLabelID(label.labelID);
                      setLabelData(label);
                    }}
                  />
                </div>
              </Tooltip>
            ))}
          </div>
          <div id='label-info-section'>
            <div>Label Name: {labelData.name}</div>
            <div>Description: {labelData.description}</div>
          </div>
          <br />
          {none}
          {currTasksFiltered.length > 0 && (
            <>
              <div className='heading'>Ongoing Tasks</div>
              <TasksList
                tasksList={currTasksFiltered}
                setCurrTasksList={setCurrTasks}
                labels={labels}
                tab={CURRENT_TASK_TAB}
                showDate={true}
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
                setCurrTasksList={setCurrTasks}
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
