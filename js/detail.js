let animes = [];

const topSectionEl = document.getElementById("title-rating-container");
const episodesContainerEL = document.getElementById("episodes-container");
const episodesTitleEl = document.getElementById("episodes");
const datesContainerEl = document.getElementById("dates-container");
const datesTitleEl = document.getElementById("dates");
const plotContainer = document.getElementById("plot-container");
const plotTitleEl = document.getElementById("plot");
const trailerContainerEl = document.getElementById("trailer-container");
const characterContainerEl = document.getElementById("character-container");
const reviewContainerEl = document.getElementById("review-container");

//ChatGPT, asked how to transfer data in a simple way through URL
function getAnimeIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");

}

async function loadAnimeData() {
    const animeResponse = await fetch("data/anime.json");
    const animeJSON = await animeResponse.json();
    animes = animeJSON.animes;

    // console.log(animeJSON);
    renderContent();

}

function createAnimeDetails(anime) {
    const titleElement = document.createElement("h2");
    titleElement.classList.add("anime-title");
    titleElement.innerText = anime.title;
    topSectionEl.appendChild(titleElement);

    const episodesEl = document.createElement("p");
    episodesEl.innerText = `${anime.episodes}`;
    episodesContainerEL.appendChild(episodesEl);

    const datesEl = document.createElement("p");
    datesEl.innerText = `${anime.dates}`;
    datesContainerEl.appendChild(datesEl);

    const plotEl = document.createElement("p");
    plotEl.innerText = `${anime.plot}`;
    plotContainer.appendChild(plotEl);

}

function renderContent() {
    topSectionEl.innerHTML = "";
    episodesTitleEl.innerHTML = "Episodes:";
    datesTitleEl.innerHTML = "Dates:";
    plotTitleEl.innerHTML = "Plot";
    characterContainerEl.innerHTML = "";
    reviewContainerEl.innerHTML = "";
    // trailerContainerEl.innerHTML = "";


    const animeId = parseInt(getAnimeIdFromURL());
    const anime = animes.find(a => a.id === animeId);

    createAnimeDetails(anime);

}

loadAnimeData();

// const El = document.getElementById("");