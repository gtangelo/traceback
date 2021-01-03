/*global chrome*/
chrome.storage.sync.clear();
chrome.storage.sync.set({
  currTasks: [],
  pastTasks: [],
});

setInterval(() => {
  chrome.storage.sync.get('currTasks', ({ currTasks }) => {
    console.log(currTasks)
    chrome.storage.sync.set({
      currTasks: currTasks.map(task => {
        if (task.onPlay) {
        task.time++
        }
        return task;
    }) });
  })
}, 1000);