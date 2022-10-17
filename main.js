const APIURL = "https://api.github.com/users/";

const main = document.querySelector("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(userName) {
  try {
    const res = await fetch(APIURL + userName);
    const resData = await res.json();

    createUserCard(resData);
    getRepos(userName);
  } catch (err) {
    createErrorCard("No profile with the Username");
  }
}

async function getRepos(userName) {
  try {
    const res = await fetch(APIURL + userName + "/repos?sort=created");
    const resData = await res.json();
    addReposToCard(resData);
  } catch (err) {
    createErrorCard("Problem Fetching Repos");
  }
}

function createUserCard(user) {
  const cardText = `
    <div class="card">
    <img class="avatar" src="${user.avatar_url}" alt"${user.name}">
    <div class="user-info">
    <h2>${user.name}</h2>
    <p>${user.bio}</p>
    <ul>
    <li>${user.followers} <strong> followers</strong></li>
    <li>${user.following} <strong> following</strong></li>
      <li>${user.public_repos} <strong> repos</strong></li>
    </ul>
    <div id="repos"></div>
    </div>
    </div>
    `;

  main.innerHTML = cardText;
}

function createErrorCard(msg) {
  const cardText = `<div class= "card">
    <h1>${msg}</h1>
  </div>`;
  main.innerHTML = cardText;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
