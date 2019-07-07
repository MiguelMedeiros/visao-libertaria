chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    if (message.command == "add-url") {
      addToWhitelist().then((domain) => {
        sendResponse(domain);
      });
    }
    if (message.command == "get-url") {
      getCurrentTabURLDomain().then((domain) => {
        sendResponse(domain);
      }
      );
    }
    if (message.command == "get-whitelist") {
      getWhitelist().then((whitelist) => {
        sendResponse({whitelist : whitelist});
      });
    }
    if (message.command == "check-current-url") {
      checkURLPermission().then((isEnabled) => {
        sendResponse({isURLEnabled : isEnabled});
      });
    }
    return true;
  }
);

function checkURLPermission() {
  return new Promise((resolve) => {
    getCurrentTabURLDomain().then((domain) => {
      getWhitelist().then((whitelist) => {
        resolve(whitelist.indexOf(domain) == -1);
      });
    });
  });
}

function getCurrentTabURLDomain() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true, active: true },
      function (tabs) {
        if (tabs[0].url) {
          let domain = new URL(tabs[0].url).hostname;
          resolve(domain);
        } else {
          reject("Error: could not access any url of tabs");
        }
      });
  });
}

function getWhitelist() {
  return new Promise((resolve) => {
    chrome.storage.local.get("whitelist", function (data) {
      if (data.whitelist) {
        resolve(data.whitelist);
      } else {
        resolve([]);
      }
    });
  });
}

function addToWhitelist() {
  return new Promise((resolve, reject) => {
    getWhitelist().then((whitelist) => {
      getCurrentTabURLDomain().then((domain) => {
        if (domain) {
          whitelist.unshift(domain);
          chrome.storage.local.set({ "whitelist": whitelist });
          resolve({ domain: domain });
        } else {
          reject("Error: could not retrieve any domain");
        }
      });
    });
  });
}