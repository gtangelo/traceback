/*global chrome*/
const updateTime = () => {
  chrome.storage.local.get(['isPlay', 'currTasks', 'pastTasks'], (resp) => {
    let editTasks = [];
    resp.currTasks.forEach((currTask) => {
      if (currTask.isPlay) {
        currTask.time++;
      }
      editTasks.push(currTask);
    });
    chrome.storage.local.set({ currTasks: editTasks });
  });
};

chrome.storage.local.clear();
chrome.storage.local.set({
  currTasks: [
    {
      time: 0,
      isPlay: false,
      task: 'Doing homework',
      taskID: 1,
    },
    {
      time: 0,
      isPlay: false,
      task: 'Having fun',
      taskID: 2,
    },
    {
      time: 0,
      isPlay: false,
      task: 'Webcms',
      taskID: 1,
    },
  ],
  pastTasks: [],
});

setInterval(updateTime, 1000);
