import React from 'react'
import { CURRENT_TASK_TAB, PAST_TASK_TAB } from 'globals.js'
import currTaskBtn from 'images/timerIcon.png'
import pastTaskBtn from 'images/historyIcon.png';
import './index.css'

const Navbar = ({ currPage, setCurrPage }) => {
  let currTab = "off";
  let pastTab = 'off';
  if (currPage === CURRENT_TASK_TAB) {
    currTab = "on"
  }
  if (currPage === PAST_TASK_TAB) {
    pastTab = "on"
  }

  return (
    <nav>
      <div
        className={'nav-item-' + currTab}
        onClick={() => setCurrPage(CURRENT_TASK_TAB)}
      >
        <img
          className={'tab-image-' + currTab}
          src={currTaskBtn}
          alt='Current Tasks'
        />
      </div>
      <div
        className={'nav-item-' + pastTab}
        onClick={() => setCurrPage(PAST_TASK_TAB)}
      >
        {' '}
        <img
          className={'tab-image-' + pastTab}
          src={pastTaskBtn}
          alt='Past Tasks'
        />
      </div>
    </nav>
  );
};

export default Navbar;