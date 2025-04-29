//js for loading data from JSON files
let animes = [];
const contentElement = document.getElementById("content");

// HTMl elements to appendChild() to (node/nest)

const episodesCategoryElement = document.getElementById(episodesCategory);

async function loadData() {
    const animeDetails = await fetch("data/anime.json");
    const animeJSON = await animeDetails.json();
    animes = animeJSON.animes;
    
    console.log(animeJSON);
    renderContent();
}



function createAnimeDetails(animes) {
    const wallpaperElement = document.createElement("img");
    wallpaperElement.classList.add("wallpaper");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("title");

    const ratingElement = document.createElement("p");
    ratingElement.classList.add("rating-value");

    const episodesElement = document.createElement("p");
    episodesElement.classList.add("episodes-number");
    episodesCategoryElement.appendChild(episodesElement);

    const datesElement = document.createElement("p");
    datesElement.classList.add("p");

    const plotElement = document.createElement("p");
    plotElement.classList.add("plot");

    // const Element = document.createElement("");
    // .classList.add("");
}

// function createReviews() {}

// function createCharacters() {}

function renderContent() {
    // contentElement.innerHTML = "";

}

loadData();