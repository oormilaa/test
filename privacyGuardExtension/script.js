let addomains= [    
    "*://*.doubleclick.net/*",
    "*://*.googlesyndication.com/*",
    "*://*.adservice.google.com/*",
  "*://*.adnxs.com/*",
  "*://*.adsafeprotected.com/*",
  "*://*.advertising.com/*"
];

const getwhilelist = async() => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(["whitelist"],(result) => {
            resolve(result.whitelist || []);
        });
    });
};

chrome.webRequest.onBeforeRequest.addListener(
    async function(details) {
        const url = new URL(details.url);
        let domain = url.hostname;
        const whitelist = await getwhilelist();
        if(whitelist.includes(domain)) {
            return {cancle: false};
        }
        return {cancle: true}
    },
    {urls: addomains},
    ["blocking"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
    async function(details) {
        const hascookies = details.requestHeaders.some(header => header.name.toLowerCase() === 'cookie');
        if(hascookies) {
            chrome.notifications.create({
                type: "basic",
                iconUrl: "icons/icon2.png",
                title: "Warning",
                message: "This site wants to access cookies!"
            });
        }
        return {requestHeaders: details.requestHeaders};
    },
    {urls: ["<all_urls>"]},
    ["requestHeaders"]
);

let currenttabid = null;
let sitestarttime = null;

const savetime = async (domain, timespent) => {
    chrome.storage.sync.get(["timespent"], (result) => {
        const timedata = result.timespent || {};
        timedata[domain] = (timedata[domain] || 0) + timespent;
        chrome.storage.sync.set({timespent:timedata});
    });
};

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    if(currenttabid && sitestarttime) {
        chrome.tabs.get(currenttabid, (tab) => {
            const url = new URL(tab.url);
            const domain = url.hostname;
            const timespent = (Date.now() - sitestarttime) / 1000;
            savetime(domain, timespent);
        });
    }
    currenttabid = activeInfo.tabId;
    sitestarttime = Date.now();
});

chrome.tabs.onUpdated.addListener((tabId,changeinfo,tab) => {
    if(tabId === currenttabid && changeinfo.url) {
        if(sitestarttime) {
            const timespent = Math.round((Date.now() - sitestarttime) / 1000);
            const url = new URL(changeinfo.url);
            const domain = url.hostname;
            savetime(domain, timespent);
        }
        sitestarttime = Date.now();
    }
});

chrome.tabs.onRemoved.addListener((tabId) => {
    if(tabId === currenttabid && sitestarttime) {
        chrome.tabs.get(tabId,(tab) => {
            const url = new URL(tab.url);
            const domain = url.hostname;
            const timespent = Math.round((Date.now() - sitestarttime)/ 1000);
            savetime(domain,timespent);
        });
    }
    currenttabid = null;
    sitestarttime = null;
});