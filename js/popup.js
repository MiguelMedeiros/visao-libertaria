document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-to-whitelist").addEventListener("click", addToWhitelist);
  document.getElementById("show-whitelist").addEventListener("click", showWhitelist);
  document.getElementById("clean-whitelist").addEventListener("click", cleanWhitelist);
});

function addToWhitelist() {
  chrome.runtime.sendMessage({command: "add-url"}, (response) => {
    let divContainer = document.getElementById("whitelist");
    divContainer.innerHTML = null;
    divContainer.innerText = `As páginas de ${response.domain} não receberão o Red Pill.`;
  });
}

function showWhitelist() {
  chrome.runtime.sendMessage({command: "get-whitelist"}, (data) => {
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
      li.innerText = url;
      li.setAttribute("class", "whitelist");
      ul.appendChild(li);
    });
  } else {
    ul.innerText = "Lista vazia";
  }
  return ul;
}

function cleanWhitelist() {
  chrome.storage.local.set({ "whitelist": [] });
  // updates list if it is on screen
  let divContainer = document.getElementById("whitelist");
  if (divContainer.firstChild) {
    showWhitelist();
  }
}