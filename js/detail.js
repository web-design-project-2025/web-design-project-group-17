let animes = [];

const topSectionEl = document.getElementById("title-rating-container");
const episodesTitleEl = document.getElementById("episodes");
const datesTitleEl = document.getElementById("dates");
const plotTitleEl = document.getElementById("plot");

async function loadAnimeData() {
    const animeResponse = await fetch("data/anime.json");
    const animeJSON = await animeResponse.json();
    animes = animeJSON.animes;

    console.log(animeJSON);
    renderContent();
}

function createAnimeDetails(anime) {
    const titleElement = document.createElement("h2");
    titleElement.classList.add("anime-title");
    topSectionEl.appendChild(titleElement);
}

function renderContent() {
    topSectionEl.innerHTML = "";

}

loadAnimeData();