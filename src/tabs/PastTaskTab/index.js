import React from 'react';

import TasksList from 'components/TasksList';
import { TabContainer } from 'components/styled/Container';
import { Heading } from 'components/styled/Title';
import { PAST_TASK_TAB } from 'utils/constants';

const PastTaskTab = ({ pastTasks, labels, totalTime }) => {
  return (
    <TabContainer>
      <Heading>Past Tasks</Heading>
      <br/>
      {pastTasks.length === 0 ? (
        <div>No tasks has been completed</div>
      ) : (
        <TasksList
          tasksList={pastTasks}
          labels={labels}
          tab={PAST_TASK_TAB}
          totalTime={totalTime}
          showDate
        />
      )}
    </TabContainer>
  );
};

export default PastTaskTab;
