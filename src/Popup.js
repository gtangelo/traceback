import { Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import PastTaskScreen from './PastTaskScreen';
import CurrTaskScreen from './CurrTaskScreen';
import './Popup.css'


const CURRENT_TASK_TAB = 'Current Task';
const PAST_TASK_TAB = 'Past Task';


const Popup = () => {
  const [currPage, setCurrPage] = useState(CURRENT_TASK_TAB);
  const [totalTime, setTotalTime] = useState(0);
  const [pastTasksList, setPastTasksList] = useState([]);
  const [currTasksList, setCurrTasksList] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTasksList((currTasksList) =>
        currTasksList.map((task) => {
          if (task.isPlaying) {
            return { ...task, time: task.time++ }
          }
          return task
        }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let isActive = currTasksList.filter((task) => task.isPlaying).length > 0;
  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setTotalTime((totalTime) => totalTime + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className='Popup'>
      <div>
        <Button
          variant='contained'
          onClick={() => setCurrPage(CURRENT_TASK_TAB)}
        >
          Current Tasks
        </Button>
        <Button variant='contained' onClick={() => setCurrPage(PAST_TASK_TAB)}>
          Past Tasks
        </Button>
      </div>
      {currPage === CURRENT_TASK_TAB ? (
        <CurrTaskScreen
          tasksList={currTasksList}
          setTasksList={setCurrTasksList}
          setPastTasks={setPastTasksList}
          totalTime={totalTime}
        />
      ) : (
        <PastTaskScreen tasks={pastTasksList} />
      )}
    </div>
  );
}

export default Popup
