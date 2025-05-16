document.addEventListener('DOMContentLoaded', () => {
  const favContainer = document.querySelector('#favorites-container');
  const animeData = [
    { id: "10", name: "Fire Force", img: "./img/covers/fireforce-cover-1.jpg" },
    { id: "1", name: "Attack on Titan", img: "./img/covers/attack-on-titan.jpg" },
    { id: "8", name: "Demon Slayer", img: "./img/covers/demonslayer-cover-1.jpg" },
    { id: "4", name: "One Piece", img: "./img/covers/one-piece-cover-1.jpg" },
    { id: "5", name: "Haikyu!!", img: "./img/covers/haikyu-cover-1.jpg" }
  ];

  const raw = sessionStorage.getItem('favorites');
  const favorites = raw ? JSON.parse(raw) : [];

  const favAnimes = animeData.filter(anime => favorites.includes(anime.id));

  favAnimes.forEach(anime => {
    const card = document.createElement('div');
    card.className = 'anime-card';

    const img = document.createElement('img');
    img.src = anime.img;
    img.alt = anime.name;

    const title = document.createElement('h3');
    title.textContent = anime.name;

    card.appendChild(img);
    card.appendChild(title);
    favContainer.appendChild(card);
  });
});