document.addEventListener("DOMContentLoaded", () => {
  showWhitelist();
  document
    .getElementById("add-to-whitelist")
    .addEventListener("click", addToWhitelist);
});

function addToWhitelist() {
  chrome.runtime.sendMessage({ command: "add-url" }, response => {
    let divContainer = document.getElementById("whitelist-message");
    divContainer.style.diplay = "block";
    divContainer.innerHTML = null;
    divContainer.innerHTML = `As páginas de <span>${response.domain}</span> não receberão o Red Pill.`;
    setTimeout(() => {
      document.getElementById("whitelist-message").style.display = "none";
    }, 3000);
    showWhitelist();
    reloadPage();
  });
}

function removeSiteWhitelist(url) {
  chrome.runtime.sendMessage({ command: "get-whitelist" }, data => {
    data.whitelist.map((element, index) => {
      if (element === url) {
        data.whitelist.splice(index, 1);
      }
    });
    let divContainer = document.getElementById("whitelist");
    if (divContainer.firstChild) {
      divContainer.removeChild(divContainer.firstChild);
    }
    let ul = populateList(data.whitelist);
    divContainer.appendChild(ul);
    chrome.storage.local.set({ whitelist: data.whitelist });
    reloadPage();
  });
}

function showWhitelist() {
  chrome.runtime.sendMessage({ command: "get-whitelist" }, data => {
    let divContainer = document.getElementById("whitelist");
    if (divContainer.firstChild) {
      divContainer.removeChild(divContainer.firstChild);
    }
    let ul = populateList(data.whitelist);
    divContainer.appendChild(ul);
  });
}

function populateList(list) {
  let ul = document.createElement("UL");
  ul.setAttribute("class", "whitelist");
  if (list.length > 0) {
    list.forEach(url => {
      let li = document.createElement("LI");
      let button = document.createElement("button");
      let span = document.createElement("span");
      button.innerHTML =
        '<i class="fa fa-trash remove-whitelist" data-url="' + url + '"></i>';
      span.innerText = url;
      li.appendChild(button);
      li.appendChild(span);
      button.addEventListener("click", e => {
        removeSiteWhitelist(e.target.dataset.url);
      });
      ul.appendChild(li);
    });
  } else {
    ul.innerText = "Lista vazia";
  }
  return ul;
}

function reloadPage() {
  chrome.tabs.getSelected(null, function(tab) {
    var code = "window.location.reload();";
    chrome.tabs.executeScript(tab.id, { code: code });
  });
}
