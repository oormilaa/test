chrome.runtime.onInstalled.addListener(() => {
    console.log('Search Bar Extension installed!');
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
});