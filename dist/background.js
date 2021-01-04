/*global chrome*/

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get({
    currTasks: [],
    totalTime: 0,
  }, ({currTasks, totalTime}) => {
      chrome.storage.local.set(
        { currTasks: currTasks, totalTime: totalTime }
      );
  });
});

setInterval(() => {
  chrome.storage.local.get(
    ['currTasks', 'totalTime'],
    ({ currTasks, totalTime }) => {
      console.log(currTasks);
      console.log(totalTime);
      chrome.storage.local.set({
        currTasks: currTasks.map((task) => {
          if (task.onPlay) {
            task.time++;
          }
          return task;
        }),
      });
      if (currTasks.filter((task) => task.onPlay).length > 0) {
        chrome.storage.local.set({ totalTime: totalTime + 1 });
      }
    }
  );
}, 1000);