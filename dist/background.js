/*global chrome*/

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.get({
    currTasks: [],
    pastTasks: [],
    totalTime: 0,
  }, ({currTasks, pastTasks, totalTime}) => {
      chrome.storage.sync.set(
        { currTasks: currTasks, pastTasks: pastTasks, totalTime: totalTime }
      );
  });
});

setInterval(() => {
  chrome.storage.sync.get(
    ['currTasks', 'totalTime'],
    ({ currTasks, totalTime }) => {
      console.log(currTasks);
      console.log(totalTime);
      chrome.storage.sync.set({
        currTasks: currTasks.map((task) => {
          if (task.onPlay) {
            task.time++;
          }
          return task;
        }),
      });
      if (currTasks.filter((task) => task.onPlay).length > 0) {
        chrome.storage.sync.set({ totalTime: totalTime + 1 });
      }
    }
  );
}, 1000);