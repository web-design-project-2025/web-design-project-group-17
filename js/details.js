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
    characters = characterJSON.characters;

    console.log(animeJSON);
    console.log(characterJSON);

    renderContent();
}

function getCharacterByID(id) {
    return animes.find((anime) => anime.id === id);
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

function createCharacterDetails(characterList) {
    // Create HTML Elements of <<<<<CHARACTER INFO>>>>>

    characterList.forEach(character => {
        const charFigureEl = document.createElement("figure");
        charFigureEl.classList.add("character-element");
        characterContainerEl.appendChild(charFigureEl);

        const charImgEl = document.createElement("img");
        charImgEl.src = `${character.img}`;
        charImgEl.classList.add("character-img");
        charFigureEl.appendChild(charImgEl);

        const charFigcaptionEL = document.createElement("figcaption");
        // charFigcaptionEL.innerText = `$character.name`;
        charFigureEl.appendChild(charFigcaptionEL)

        const nameEl = document.createElement("p");
        nameEl.innerText = `${character.name}`;
        charFigcaptionEL.appendChild(nameEl);

        const roleEl = document.createElement("p");
        roleEl.innerText = `${character.role}`;
        charFigcaptionEL.appendChild(roleEl);
    });
    
}

function renderContent() {
    topSectionEl.innerHTML = "";
    episodesTitleEl.innerHTML = "Episodes:";
    datesTitleEl.innerHTML = "Dates:";
    plotTitleEl.innerHTML = "Plot:";
    characterContainerEl.innerHTML = "";
    reviewContainerEl.innerHTML = "";
    // trailerContainerEl.innerHTML = "";

    // Getting the correct anime to load
    const animeId = parseInt(getAnimeIdFromURL());
    const anime = animes.find(a => a.id === animeId);

    // Getting the matching characters to the anime, to load
    const matchingCharacters = characters.filter(c => c.anime_id === animeId);

    createAnimeDetails(anime);
    createCharacterDetails(matchingCharacters);
}

loadAnimeData();