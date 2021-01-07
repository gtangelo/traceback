/*global chrome*/

// When the chrome browser is opened after it was closed, it checks local storage
// for data in the previous session (i.e. currTasks and totalTime). If found, 
// it set up those values to local storage. Otherwise, it set up default values.
// This ensures that data in local storage before the browser was closed 
// persisted after when it is opened again and copying the state.
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(
    {
      currTasks: [],
      totalTime: 0,
    },
    ({ currTasks, totalTime }) => {
      chrome.storage.local.set({
        currTasks: currTasks,
        totalTime: totalTime,
      });
    }
  );
});

// This portion of the code runs every minute to checking whether a task is 
// playing and increments the time for that task and the total time as well.

setInterval(() => {
  chrome.storage.local.get(
    ['currTasks', 'totalTime', 'start'],
    ({ currTasks, totalTime, start }) => {
      console.log(currTasks);
      console.log(totalTime);
      console.log(start);
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