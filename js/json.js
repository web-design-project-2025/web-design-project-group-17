//js for loading data from JSON files
let animes = [];
const contentElement = document.getElementById("content");

async function loadData() {
    const animeDetailsResponse = await fetch("data/anime.json");
    const animeJSON = await animeDetailsResponse.json();
    animes = animeJSON.animes;
    
    console.log(animeJSON);
    renderContent();
}

function createAnimeDetails(anime) {
    const animeDetailsElement = document.createElement("section");
    animeDetailsElement.classList.add("detail-page");

    const coverElement = document.createElement("img");
    coverElement.src = animes.cover;
    animeDetailsElement.appendChild(coverElement);
    
    return animeDetailsElement;
}

function renderContent() {
    contentElement.innerHTML = "";

    //chatGPT
    animes.forEach(anime => {
        const animeDetailsElement = createAnimeDetails(anime);
        contentElement.appendChild(animeDetailsElement);
    });
}

loadData();






/*  MORE CODE TO RENDER JSON DATA, it is unfinished, and needs to be tweaked to our specific purpose,
    but it's just to have the code still, if we need it
*/


// HTMl elements to appendChild() to (node/nest)

// // const episodesCategoryElement = document.getElementById("episodesCategory");


//     // const episodesElement = document.createElement("p");
//     // episodesElement.classList.add("episodes-number");
//     // episodesCategoryElement.appendChild(episodesElement);

//     function createAnimeDetails(animes) {
//         const wallpaperElement = document.createElement("img");
//         wallpaperElement.classList.add("wallpaper");
    
//         const titleElement = document.createElement("h2");
//         titleElement.classList.add("title");
    
//         const ratingElement = document.createElement("p");
//         ratingElement.classList.add("rating-value");
    
//         const episodesElement = document.createElement("p");
//         episodesElement.classList.add("episodes-number");
//         episodesCategoryElement.appendChild(episodesElement);
    
//         const datesElement = document.createElement("p");
//         datesElement.classList.add("p");
    
//         const plotElement = document.createElement("p");
//         plotElement.classList.add("plot");
    
//         // const Element = document.createElement("");
//         // .classList.add("");
    
//     // load animes first, then load characters, then the reviews etc - async & await
//     }
    
//     // function getAnimeById(id) {
//     //     return animes.find((user) => user.id === id);
//     // }
    
//     // function createReviews() {}
    
//     // function createCharacters() {}