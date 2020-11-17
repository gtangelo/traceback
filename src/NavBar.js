import React from 'react'
import { CURRENT_TASK_TAB, PAST_TASK_TAB } from './globals'
import currTaskBtn from './images/timerIcon.png'
import pastTaskBtn from './images/historyIcon.png';
import './NavBar.css'

const NavBar = ({ currPage, setCurrPage }) => {
  let currTab = "off";
  let pastTab = 'off';
  if (currPage === CURRENT_TASK_TAB) {
    currTab = "on"
  }
  if (currPage === PAST_TASK_TAB) {
    pastTab = "on"
  }

  return (
    <navbar className='navbar'>
      <div
        className={'icon-btn-' + currTab}
        onClick={() => setCurrPage(CURRENT_TASK_TAB)}
      >
        <img
          className={'tab-image-' + currTab}
          src={currTaskBtn}
          alt='Current Tasks'
        />
      </div>

      <div
        className={'icon-btn-' + pastTab}
        onClick={() => setCurrPage(PAST_TASK_TAB)}
      >
        <img
          className={'tab-image-' + pastTab}
          src={pastTaskBtn}
          alt='Past Tasks'
        />
      </div>
    </navbar>
  );
};

export default NavBar;