import { TextField, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import ClockConverter from 'utils/helpers/ClockConverter';
import {
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiFillDelete,
  AiOutlineCheck,
  AiOutlineInfo,
} from 'react-icons/ai';
import SpliceArrayByDay from 'utils/helpers/SpliceArrayByDay';
import TasksList from 'components/TasksList';
import { CURRENT_TASK_TAB, PAST_TASK_TAB } from 'utils/constants';


const SearchTab = ({ labels, currTasksList, setCurrTasksList, pastTasksList }) => {
  const [labelID, setLabelID] = useState(0);
  const [labelData, setLabelData] = useState("")
  const [search, setSearch] = useState("")
  
  const currTasksListFiltered = currTasksList.filter(
    (task) => task.labelID === labelID
  );
  const pastTasksListFiltered = pastTasksList.filter((task) => task.labelID === labelID);
  let none = ""
  if (currTasksListFiltered.length === 0 && pastTasksListFiltered.length === 0) {
    none = "No ongoing or previous tasks have been assigned with this label."
  }
  const currTasksListSearch = currTasksList.filter(task => task.name.includes(search));
  const pastTasksListSearch = pastTasksList.filter((task) =>
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
            {currTasksListFiltered.length > 0 && (
              <>
                <div className='heading'>Ongoing Tasks</div>
                <TasksList
                  tasksList={currTasksListFiltered}
                  setCurrTasksList={setCurrTasksList}
                  labels={labels}
                  tab={CURRENT_TASK_TAB}
                />
              </>
            )}
            {pastTasksListFiltered.length > 0 && (
              <>
                <div className='heading'>Previous Tasks</div>
                <TasksList
                  tasksList={pastTasksListFiltered}
                  labels={labels}
                  tab={PAST_TASK_TAB}
                />
              </>
            )}
          </>
        ) : (
          <>
            {currTasksListSearch.length > 0 && (
              <>
                <div className='heading'>Ongoing Tasks</div>
                <TasksList
                  tasksList={currTasksListSearch}
                  setCurrTasksList={setCurrTasksList}
                  labels={labels}
                  tab={CURRENT_TASK_TAB}
                />
              </>
            )}
            {pastTasksListSearch.length > 0 && (
              <>
                <div className='heading'>Previous Tasks</div>
                <TasksList
                  tasksList={pastTasksListFiltered}
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
