/* global chrome */

import React from 'react';
import { CURRENT_TASK_TAB, PAST_TASK_TAB, LABELS_TAB, SEARCH_TAB } from 'utils/constants';
import './index.css';
import {
  AiOutlineFieldTime,
  AiOutlineUnorderedList,
  AiOutlineSearch,
} from 'react-icons/ai';
import { MdLabel } from 'react-icons/md';

const Navbar = ({ tab, setTab }) => {
  let currTab = "off";
  let pastTab = 'off';
  let labelsTab = 'off';
  let searchTab = "off";
  if (tab === CURRENT_TASK_TAB) {
    currTab = "on"
  }
  if (tab === PAST_TASK_TAB) {
    pastTab = "on"
  }
  if (tab === LABELS_TAB) {
    labelsTab = "on"
  }
  if (tab === SEARCH_TAB) {
    searchTab = "on"
  }

    const Reset = () => {
      chrome.storage.sync.set({
        currTasks: [],
        pastTasks: [],
        totalTime: 0,
      });
    };

  return (
    <nav>
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
      <button onClick={Reset}>Reset</button>
    </nav>
  );
};

export default Navbar;