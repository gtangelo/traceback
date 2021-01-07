/* global chrome */
import React from 'react';
import axios from 'axios';
import './index.css';

import {
  AiOutlineFieldTime,
  AiOutlineUnorderedList,
  AiOutlineSearch,
} from 'react-icons/ai';
import { FaPowerOff, FaTrash } from 'react-icons/fa';
import { MdLabel } from 'react-icons/md';

import { TooltipButton, CircleButton } from 'components/styled/Button';
import {
  CURRENT_TASK_TAB,
  PAST_TASK_TAB,
  LABELS_TAB,
  SEARCH_TAB,
  USER_ID,
} from 'utils/constants';

const Navbar = ({ tab, setTab }) => {
  let currTab = "off";
  let pastTab = 'off';
  let labelsTab = 'off';
  let searchTab = "off";
  if (tab === CURRENT_TASK_TAB) {
    currTab = "on";
  }
  if (tab === PAST_TASK_TAB) {
    pastTab = "on";
  }
  if (tab === LABELS_TAB) {
    labelsTab = "on";
  }
  if (tab === SEARCH_TAB) {
    searchTab = "on";
  }

  const Clear = () => {
    chrome.storage.local.set({
      currTasks: [],
      totalTime: 0,
    });
    chrome.storage.local.remove(['lastUsed']);
  };

  const Reset = () => {
    chrome.storage.local.set({
      currTasks: [],
      totalTime: 0,
    });
    chrome.storage.local.remove(["lastUsed"]);
    axios.delete('/clear', {
      params: {
        userID: USER_ID,
      },
    }).catch((e) => console.log(e));
  };

  return (
    <nav className='navbar-container'>
      <div style={{ width: '100%' }}>
        <div
          className={'nav-item-' + currTab}
          onClick={() => setTab(CURRENT_TASK_TAB)}
        >
          <AiOutlineFieldTime
            size='25px'
            color={currTab === 'on' ? '#333333' : '#F2F2F2'}
          />
        </div>
        <div
          className={'nav-item-' + pastTab}
          onClick={() => setTab(PAST_TASK_TAB)}
        >
          <AiOutlineUnorderedList
            size='25px'
            color={pastTab === 'on' ? '#333333' : '#F2F2F2'}
          />
        </div>
        <div
          className={'nav-item-' + labelsTab}
          onClick={() => setTab(LABELS_TAB)}
        >
          <MdLabel
            size='25px'
            color={labelsTab === 'on' ? '#333333' : '#F2F2F2'}
          />
        </div>
        <div
          className={'nav-item-' + searchTab}
          onClick={() => setTab(SEARCH_TAB)}
        >
          <AiOutlineSearch
            size='25px'
            color={searchTab === 'on' ? '#333333' : '#F2F2F2'}
          />
        </div>
      </div>
      <div className='navbar-btn-section'>
        <TooltipButton
          button={CircleButton}
          title='Clear Local Storage'
          onClick={Clear}
          style={{ marginBottom: 10 }}
        >
          <FaPowerOff size='14px' color='#333333' />
        </TooltipButton>
        <TooltipButton
          button={CircleButton}
          title='Reset Data'
          onClick={Reset}
          style={{ marginBottom: 10 }}
        >
          <FaTrash size='14px' color='#333333' />
        </TooltipButton>
      </div>
    </nav>
  );
};

export default Navbar;