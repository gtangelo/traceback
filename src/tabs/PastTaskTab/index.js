import React from 'react';
import TasksList from 'components/TasksList';
import { PAST_TASK_TAB } from 'utils/constants';

const PastTaskTab = ({ pastTasks, labels, totalTime }) => {
  return (
    <div className='tab-container'>
      <div className='heading'>Past Tasks</div>
      {pastTasks.length === 0 ? (
        <div>No completed tasks available to show</div>
      ) : (
        <TasksList
          tasksList={pastTasks}
          labels={labels}
          tab={PAST_TASK_TAB}
          showDate={true}
          showDelete={false}
          showFinish={false}
          showInfo={true}
          totalTime={totalTime}
        />
      )}
    </div>
  );
};

export default PastTaskTab;
