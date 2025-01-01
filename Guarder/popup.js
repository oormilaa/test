document.addEventListener("DOMContentLoaded", () => {
    const whitelistEl = document.getElementById("whitelist");
    const timeSpentEl = document.getElementById("time-spent");
    const addDomainInput = document.getElementById("new-domain");
    const addDomainBtn = document.getElementById("add-domain");
  
    // Load whitelist
    chrome.storage.sync.get("whitelist", (result) => {
      const whitelist = result.whitelist || [];
      whitelist.forEach(domain => {
        const li = createListItem(domain);
        whitelistEl.appendChild(li);
      });
    });
  
    // Load time spent
    chrome.storage.sync.get("timeSpent", (result) => {
      const timeData = result.timeSpent || {};
      for (const domain in timeData) {
        const li = document.createElement("li");
        li.textContent = `${domain}: ${timeData[domain]} seconds`;
        timeSpentEl.appendChild(li);
      }
    });
  
    // Add to whitelist
    addDomainBtn.addEventListener("click", () => {
      const domain = addDomainInput.value;
      if (domain) {
        chrome.storage.sync.get("whitelist", (result) => {
          const whitelist = result.whitelist || [];
          if (!whitelist.includes(domain)) {
            whitelist.push(domain);
            chrome.storage.sync.set({ whitelist }, () => {
              const li = createListItem(domain);
              whitelistEl.appendChild(li);
            });
          }
        });
      }
      addDomainInput.value = ""; // Clear input
    });
  
    // Helper function to create list items with remove button
    function createListItem(domain) {
      const li = document.createElement("li");
      li.textContent = domain;
  
      // Add remove button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.style.marginLeft = "10px";
      removeBtn.addEventListener("click", () => {
        removeDomain(domain);
        li.remove();
      });
  
      li.appendChild(removeBtn);
      return li;
    }
  
    // Remove from whitelist
    function removeDomain(domain) {
      chrome.storage.sync.get("whitelist", (result) => {
        const whitelist = result.whitelist || [];
        const updatedWhitelist = whitelist.filter(item => item !== domain);
        chrome.storage.sync.set({ whitelist: updatedWhitelist });
      });
    }
  });
  