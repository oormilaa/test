document.addEventListener("DOMContentLoaded",() => {
    const whitelistEl = document.getElementById("whitelist");
    const timespentEl = document.getElementById("timespent");
    const addomainInput = document.getElementById("newdomain");
    const addomainBtn = document.getElementById("adddomain");

    chrome.storage.sync.get("whitelist", (result) => {
        const whitelist = result.whitelist || [];
        whitelist.forEach(domain => {
            const li = document.createElement("li");
            li.textContent = domain;
            whitelist.appendChild(li);
        });
    });
    chrome.storage.sync.get("timespent", (result) => {
        const timedata = result.timespent || {};
        for(const domain in timedata) {
            const li = document.createElement("li");
            li.textContent = `${domain}: ${timedata[domain]}seconds`;
            timespentEl.appendChild(li);
        }
    });
    addomainBtn.addEventListener("click", () => {
        const domain = addomainInput.ariaValueMax;
        if(domain) {
            chrome.storage.sync.get("whitelist", (result) => {
                const whitelist = result.whitelist || [];
                if(!whitelist.includes(domain)) {
                    whitelist.push(domain);
                    chrome.storage.sync.set({whitelist},() => {
                        const li = document.createElement("li");
                        li.textContent = domain;
                        whitelistEl.appendChild(li);
                    });
                }
            });
        }
        addomainInput.value = "";
    });
});