//js for loading data from JSON files
let animes = [];

async function loadData() {
    const animeDetails = await fetch("data/anime.json");
    const animeJSON = await animeDetails.json();
    animes = animeJSON.animes;
    
    console.log(animeJSON);
}

loadData();

//js for carousel on home_page
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel-container');

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = carousel.querySelector('.carousel-btn.right');
    const prevBtn = carousel.querySelector('.carousel-btn.left');
    let currentIndex = 0;
    const visibleSlides = 3;

    function updateCarousel() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
      if (currentIndex + visibleSlides < slides.length) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = slides.length - visibleSlides;
      }
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  });
});