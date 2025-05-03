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
    const animeData = [
      { id: "fire-force", name: "Fire Force", img: "./img/covers/fireforce-cover-1.jpg" },
      { id: "attack-on-titan", name: "Attack on Titan", img: "./img/covers/attack-on-titan.jpg" },
      { id: "demon-slayer", name: "Demon Slayer", img: "./img/covers/demonslayer-cover-1.jpg" },
      { id: "one-piece", name: "One Piece", img: "./img/covers/one-piece-cover-1.jpg" },
      { id: "haikyu", name: "Haikyu!!", img: "./img/covers/haikyu-cover-1.jpg" }
    ];
  
    const track = document.querySelector('.carousel-track');
    const nextBtn = document.querySelector('.carousel-btn.right');
    const prevBtn = document.querySelector('.carousel-btn.left');
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
  
    // Create original slides
    animeData.forEach(anime => {
      const slide = createAnimeCard(anime);
      track.appendChild(slide);
    });
  
    let slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
  
    // Clone first and last N slides for infinite effect
    for (let i = 0; i < visibleSlides; i++) {
      const firstClone = slides[i].cloneNode(true);
      const lastClone = slides[slides.length - 1 - i].cloneNode(true);
      track.appendChild(firstClone);
      track.insertBefore(lastClone, track.firstChild);
    }
  
    slides = Array.from(track.children); // update after cloning
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