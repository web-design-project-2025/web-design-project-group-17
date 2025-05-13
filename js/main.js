//js for loading data from JSON files
let animes = [];

async function loadData() {
    const animeDetails = await fetch("data/anime.json");
    const animeJSON = await animeDetails.json();
    animes = animeJSON.animes;
    
    console.log(animeJSON);
}

loadData();

//Carousel functionality on index html 

  document.addEventListener('DOMContentLoaded', () => {
    const animeData = {
      "most-popular": [
      { id: "fire-force", name: "Fire Force", img: "./img/covers/fireforce-cover-1.jpg" },
      { id: "attack-on-titan", name: "Attack on Titan", img: "./img/covers/attack-on-titan.jpg" },
      { id: "demon-slayer", name: "Demon Slayer", img: "./img/covers/demonslayer-cover-1.jpg" },
      { id: "one-piece", name: "One Piece", img: "./img/covers/one-piece-cover-1.jpg" },
      { id: "haikyu", name: "Haikyu!!", img: "./img/covers/haikyu-cover-1.jpg" }
    ],
      "new-episodes": [
      { id: "shoshimin", name: "Shoshimin", img: "./img/covers/shoshimin.jpg" },
      { id: "wind-breaker", name: "Wind Breaker", img: "./img/covers/wind-breaker.jpg" },
      { id: "solo-leveling", name: "Solo Leveling", img: "./img/covers/soloo-leveling-cover.jpg" },
      { id: "one-piece", name: "One Piece", img: "./img/covers/one-piece-cover-1.jpg" },
      { id: "haikyu", name: "Haikyu!!", img: "./img/covers/haikyu-cover-1.jpg" }
    ],

    "iconic-trios": [
      { id: "fire-force", name: "Fire Force", img: "./img/covers/fireforce-cover-1.jpg" },
      { id: "attack-on-titan", name: "Attack on Titan", img: "./img/covers/attack-on-titan.jpg" },
      { id: "demon-slayer", name: "Demon Slayer", img: "./img/covers/demonslayer-cover-1.jpg" },
      { id: "one-piece", name: "One Piece", img: "./img/covers/one-piece-cover-1.jpg" },
      { id: "haikyu", name: "Haikyu!!", img: "./img/covers/haikyu-cover-1.jpg" }
    ]
    };
  
    const visibleSlides = 3;

  function loadFavorites() {
    const raw = sessionStorage.getItem('favorites');
    return raw ? JSON.parse(raw) : [];
  }

  function saveFavorites(favs) {
    sessionStorage.setItem('favorites', JSON.stringify(favs));
  }

  function toggleFavorite(id) {
    const favs = loadFavorites();
    const index = favs.indexOf(id);
    if (index === -1) {
      favs.push(id);
    } else {
      favs.splice(index, 1);
    }
    saveFavorites(favs);
    return index === -1;
  }

  function updateButton(btn, isFavorite) {
    btn.textContent = isFavorite ? '♥ In Favorites' : '♡';
  }

  function createAnimeCard(anime) {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';

    const card = document.createElement('div');
    card.className = 'anime-card';
    card.setAttribute('data-id', anime.id);

    const img = document.createElement('img');
    img.src = anime.img;
    img.alt = anime.name;

    const title = document.createElement('h3');
    title.textContent = anime.name;

    const btn = document.createElement('button');
    btn.className = 'fav-btn';
    updateButton(btn, loadFavorites().includes(anime.id));
    btn.addEventListener('click', () => {
      const added = toggleFavorite(anime.id);
      updateButton(btn, added);
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(btn);
    slide.appendChild(card);
    return slide;
  }

  document.querySelectorAll('.carousel-section').forEach(section => {
    const category = section.dataset.category;
    const data = animeData[category] || [];
    const track = section.querySelector('.carousel-track');
    const nextBtn = section.querySelector('.carousel-btn.right');
    const prevBtn = section.querySelector('.carousel-btn.left');

    data.forEach(anime => {
      const slide = createAnimeCard(anime);
      track.appendChild(slide);
    });

    let slides = Array.from(track.children);
    const slideWidth = slides[0]?.getBoundingClientRect().width || 200;

    for (let i = 0; i < visibleSlides; i++) {
      if (slides[i]) {
        track.appendChild(slides[i].cloneNode(true));
        track.insertBefore(slides[slides.length - 1 - i].cloneNode(true), track.firstChild);
      }
    }

    slides = Array.from(track.children);
    let currentIndex = visibleSlides;

    function setSlidePositions() {
      slides.forEach((slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
      });
    }

    function updateCarousel(animate = true) {
      track.style.transition = animate ? 'transform 0.5s ease' : 'none';
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    setSlidePositions();
    updateCarousel(false);

    nextBtn.addEventListener('click', () => {
      currentIndex++;
      updateCarousel();

      if (currentIndex === slides.length - visibleSlides) {
        setTimeout(() => {
          track.style.transition = 'none';
          currentIndex = visibleSlides;
          updateCarousel(false);
        }, 500);
      }
    });

    prevBtn.addEventListener('click', () => {
      currentIndex--;
      updateCarousel();

      if (currentIndex === 0) {
        setTimeout(() => {
          track.style.transition = 'none';
          currentIndex = slides.length - visibleSlides * 2;
          updateCarousel(false);
        }, 500);
      }
    });
  });
});

  /*main image slider function */

  let counter = 1;
setInterval(() => {
  document.getElementById('radio' + counter).checked = true;
  counter = counter < 4 ? counter + 1 : 1;
}, 5000);