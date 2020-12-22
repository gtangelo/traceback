import { useState, useEffect } from 'react';
import { CURRENT_TASK_TAB } from './globals';
import Navbar from 'components/Navbar/';
import PastTaskScreen from 'tabs/PastTask/';
import CurrTaskScreen from 'tabs/CurrTask/';
import './Popup.css'

const Popup = () => {
  const [currPage, setCurrPage] = useState(CURRENT_TASK_TAB);
  const [totalTime, setTotalTime] = useState(0);
  const [pastTasksList, setPastTasksList] = useState([]);
  const [currTasksList, setCurrTasksList] = useState([]);
  const [labels, setLabels] = useState([])

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
      <Navbar setCurrPage={setCurrPage} currPage={currPage} />
      {currPage === CURRENT_TASK_TAB ? (
        <CurrTaskScreen
          tasksList={currTasksList}
          setTasksList={setCurrTasksList}
          setPastTasks={setPastTasksList}
          totalTime={totalTime}
        />
      ) : (
        <PastTaskScreen tasksList={pastTasksList} />
      )}
    </div>
  );
}

export default Popup;
