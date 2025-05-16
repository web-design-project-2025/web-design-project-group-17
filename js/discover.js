let animes = [];
const animeList = document.getElementById("anime-list");

async function loadListData() {
	const listResponse = await fetch("data/animes.json");
	const listJSON = await listResponse.json();
    animes = listJSON.animes;
    console.log(animes);

    // listJSON.animes.forEach(anime => console.log(anime.title, anime.cover, anime.plot));
    renderAnimeList();
    console.log(document.body.innerHTML);
}

loadListData();

function renderAnimeList() {
    animeList.innerHTML = "";

    animes.forEach(anime => {
        let linkEl = document.createElement("a");
        linkEl.classList.add("anime-card");
        linkEl.href = `details.html?id=${anime.id}`;

        // let cardEl = document.createElement("section");
        // cardEl.classList.add("anime-card");
        // linkEl.appendChild(cardEl);

        let coverEl = document.createElement("img");
        coverEl.classList.add("anime-cover");
        coverEl.src = anime.cover;
        coverEl.alt = anime.title + "cover";
        linkEl.appendChild(coverEl);

        let infoEl = document.createElement("section");
        infoEl.classList.add("anime-info");
        linkEl.appendChild(infoEl);

        // let animeHeaderEl = document.createElement("section");
        // animeHeaderEl.classList.add("anime-header");
        // infoEl.appendChild(animeHeaderEl);

        let titleEl = document.createElement("h3");
        titleEl.classList.add("anime-title");
        titleEl.innerText = anime.title;
        infoEl.appendChild(titleEl);

        let plotEl = document.createElement("p");
        plotEl.classList.add("anime-description")
        plotEl.innerText = anime.plot;
        infoEl.appendChild(plotEl);

        let reviewButtonEl = document.createElement("a");
        reviewButtonEl.classList.add("review-button");
        reviewButtonEl.innerText = "Write Review";
        reviewButtonEl.href = `details.html?id=${anime.id}#review-container`;
        infoEl.appendChild(reviewButtonEl);

        animeList.appendChild(linkEl);
    })
}

