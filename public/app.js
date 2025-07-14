// public/app.js
const newsContainer = document.getElementById("news-container");
const loader        = document.getElementById("loader");

window.addEventListener("load", () => fetchTechCrunchNews());

function showLoader  () { loader.style.display = "block"; }
function hideLoader  () { loader.style.display = "none";  }

async function fetchTechCrunchNews() {
  showLoader();
  const res  = await fetch("/api/news");        // 👈 no key here
  const data = await res.json();
  displayArticles(data.articles || []);
  hideLoader();
}

async function searchNews() {
  const query = document.getElementById("search").value.trim();
  if (!query) return;
  showLoader();
  const res  = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  displayArticles(data.articles || []);
  hideLoader();
}

function displayArticles(arr) {
  newsContainer.innerHTML = "";
  arr.forEach(a => {
    const card = document.createElement("div");
    card.className = "article";
    card.innerHTML = `
      ${a.urlToImage ? `<img src="${a.urlToImage}" alt="news">` : ""}
      <div class="text">
        <h2>${a.title || "No title"}</h2>
        <p>${a.description || ""}</p>
        <a href="${a.url}" target="_blank">Read more</a>
      </div>
    `;
    newsContainer.appendChild(card);
  });
}
