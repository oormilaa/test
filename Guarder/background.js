let currentTabId = null;
let siteStartTime = null;

const saveTimeSpent = async (domain, timeSpent) => {
  chrome.storage.sync.get(["timeSpent"], (result) => {
    const timeData = result.timeSpent || {};
    timeData[domain] = (timeData[domain] || 0) + timeSpent;
    chrome.storage.sync.set({ timeSpent: timeData });
  });
};

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (currentTabId && siteStartTime) {
    chrome.tabs.get(currentTabId, (tab) => {
      const url = new URL(tab.url);
      const domain = url.hostname;
      const timeSpent = Math.round((Date.now() - siteStartTime) / 1000);
      saveTimeSpent(domain, timeSpent);
    });
  }
  currentTabId = activeInfo.tabId;
  siteStartTime = Date.now();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === currentTabId && changeInfo.url) {
    if (siteStartTime) {
      const timeSpent = Math.round((Date.now() - siteStartTime) / 1000);
      const url = new URL(changeInfo.url);
      const domain = url.hostname;
      saveTimeSpent(domain, timeSpent);
    }
    siteStartTime = Date.now();
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === currentTabId && siteStartTime) {
    chrome.tabs.get(tabId, (tab) => {
      const url = new URL(tab.url);
      const domain = url.hostname;
      const timeSpent = Math.round((Date.now() - siteStartTime) / 1000);
      saveTimeSpent(domain, timeSpent);
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Privacy Guard is installed or updated!");
});
