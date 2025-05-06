let animes = [];
const animeList = document.getElementById("anime-list");

async function loadListData() {
	const listResponse = await fetch("data/anime.json");
	const listJSON = await listResponse.json();
    animes = listJSON.animes;

    // listJSON.animes.forEach(anime => console.log(anime.title, anime.cover, anime.plot));
    renderAnimeList();
}

loadListData();

function renderAnimeList() {
    animeList.innerHTML = "";

    animes.forEach(anime => {
        let linkEl = document.createElement("a");
        linkEl.href = `details.html?id=${anime.id}`;

        let cardEl = document.createElement("section");
        cardEl.classList.add("anime-card");
        linkEl.appendChild(cardEl);

        let infoEl = document.createElement("section");
        infoEl.classList.add("anime-infoEl");
        cardEl.appendChild(infoEl);

        let animeHeaderEl = document.createElement("section");
        animeHeaderEl.classList.add("anime-header");
        infoEl.appendChild(animeHeaderEl);

        let titleEl = document.createElement("h3");
        titleEl.classList.add("anime-titleEl");
        titleEl.innerText = anime.title;
        animeHeaderEl.appendChild(titleEl);

        let plotEl = document.createElement("p");
        plotEl.classList.add("anime-description")
        plotEl.innerText = anime.plot;
        infoEl.appendChild(plotEl);

        let coverEl = document.createElement("img");
        coverEl.classList.add("anime-cover");
        coverEl.src = anime.cover;
        coverEl.alt = anime.alt;
        cardEl.appendChild(coverEl);

        let reviewButtonEl = document.createElement("a");
        reviewButtonEl.classList.add("review-button");
        reviewButtonEl.innerText = "Write Review";
        reviewButtonEl.href = `review.html?id=${anime.id}`;
        cardEl.appendChild(reviewButtonEl);

        animeList.appendChild(linkEl);
    })
}