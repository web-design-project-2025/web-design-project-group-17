let animes = [];
let characters = [];

// ANIME DETAIL SECTION
const topSectionEl = document.getElementById("title-rating-container");
const episodesContainerEL = document.getElementById("episodes-container");
const episodesTitleEl = document.getElementById("episodes");
const datesContainerEl = document.getElementById("dates-container");
const datesTitleEl = document.getElementById("dates");
const plotContainer = document.getElementById("plot-container");
const plotTitleEl = document.getElementById("plot");
const trailerContainerEl = document.getElementById("trailer-container");

// CHARACTER INFO SECTION
const characterContainerEl = document.getElementById("character-container");

// REVIEW SECTION
const reviewContainerEl = document.getElementById("review-container");

//Hamstergram + ChatGPT > help with transfer of data through URL and also tie the rest of the code together
function getAnimeIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function loadAnimeData() {
    //load Anime information from local JSON file
    const animeResponse = await fetch("data/anime.json");
    const animeJSON = await animeResponse.json();
    animes = animeJSON.animes;

    //load Character information from local JSON file
    const characterResponse = await fetch("data/characters.json");
    const characterJSON = await characterResponse.json();
    characters = characterJSON;

    renderContent();
}

function getCharacterByID(id) {
    return characters.find((character) => character.anime_id === id);
}

function createAnimeDetails(anime) {
    // Create HTML Elements of <<<<<ANIME INFO>>>>>
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

function createCharacterSection(character) {
    // Create HTML Elements of <<<<<CHARACTER INFO>>>>>
}

function renderContent() {
    topSectionEl.innerHTML = "";
    episodesTitleEl.innerHTML = "Episodes:";
    datesTitleEl.innerHTML = "Dates:";
    plotTitleEl.innerHTML = "Plot:";
    characterContainerEl.innerHTML = "";
    reviewContainerEl.innerHTML = "";
    // trailerContainerEl.innerHTML = "";


    const animeId = parseInt(getAnimeIdFromURL());
    const anime = animes.find(a => a.id === animeId);

    // for (let character of characters) {
    //     const character = getCharacterByID(anime.anime_id);
    //     const characterSection = createCharacterSection(character);
    //     characterContainerEl.appendChild(characterSection);
    // }

    createAnimeDetails(anime);
}

loadAnimeData();