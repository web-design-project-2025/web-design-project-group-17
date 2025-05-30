// for a lot of pages, but mainly this page:
// https://chatgpt.com/share/67d40c5d-1ddc-8007-98da-87350dc2d8ed,
// note: there is another subject discussed in the conversation (only a little bit in the beginning)
let animes = [];
let characters = [];
let users = [];
let reviews = [];

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${year}-${month}-${day}`;
console.log(currentDate); // "17-6-2022"


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

//Hamstergram + ChatGPT > help with transfer of data through URL, sorting through different json files, error handling, and also tie the rest of the code together
function getAnimeIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function loadData () {
    try {
        //load Anime data from local JSON file
        const animeResponse = await fetch("data/animes.json");
        const animeJSON = await animeResponse.json();
        animes = animeJSON.animes;

        //load Character data from local JSON file
        const characterResponse = await fetch("data/characters.json");
        const characterJSON = await characterResponse.json();
        characters = characterJSON.characters;

        //load User data from local JSON file
        const userResponse = await fetch("data/users.json");
        const userJSON = await userResponse.json();
        users = userJSON.users;

        //load Review data from local JSON file
        const reviewResponse = await fetch("data/reviews.json");
        const reviewJSON = await reviewResponse.json();
        reviews = reviewJSON.reviews;
        const userReviewData = localStorage.getItem("user_review")
        console.log(userReviewData)
        if (userReviewData)
        {
            const user_review = JSON.parse(userReviewData)
            console.log(user_review)
            reviews.push(user_review)
        }
        const userData =localStorage.getItem("user")
        if (userData)
        {
            const user= JSON.parse(userData)
            users.push(user)
        }
        renderContent();
    
    } catch (error) {
        console.error("Error loading JSON data:", error);
        document.body.innerHTML = `<p>Failed to load content. Please try again later.</p>`;
    }
}

// get user_id to connect reviews to the right user
function getUserById(id) {
    return users.find((user) => user.user_id === id);
}

// Create HTML Elements of <<<<<ANIME INFO>>>>>
function createAnimeDetails(anime) {

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

    const animeBannerEl = document.getElementById("anime-banner");
    animeBannerEl.style.backgroundImage = `url('${anime.wallpaper}')`;
}

// Create HTML Elements of <<<<<CHARACTER INFO>>>>>
function createCharacterDetails(characterList) {

    characterList.forEach(character => {
        const charFigureEl = document.createElement("figure");
        charFigureEl.classList.add("character-figure");
        characterContainerEl.appendChild(charFigureEl);

        const charImgEl = document.createElement("img");
        charImgEl.src = `${character.img}`;
        charImgEl.alt = `${character.name}`;
        charImgEl.classList.add("character-img");
        charFigureEl.appendChild(charImgEl);

        const charFigcaptionEL = document.createElement("figcaption");
        // charFigcaptionEL.innerText = `$character.name`;
        charFigureEl.appendChild(charFigcaptionEL)

        const nameEl = document.createElement("p");
        nameEl.classList.add("char-name");
        nameEl.innerText = `${character.name}`;
        charFigcaptionEL.appendChild(nameEl);

        const roleEl = document.createElement("p");
        roleEl.innerText = `${character.role}`;
        charFigcaptionEL.appendChild(roleEl);
    });
}

// Create HTML Elements of <<<<<REVIEWS>>>>>
// using both user&review.json
function createReviewDetails(review, user) {
    const reviewPostEl = document.createElement("section");
    reviewPostEl.classList.add("review-post");
    // reviewContainerEl.appendChild(reviewPostEl);

    const reviewHeaderEl = document.createElement("section");
    reviewHeaderEl.classList.add("review-header");
    reviewPostEl.appendChild(reviewHeaderEl);

    //from user.json
    const profilePictureEl = document.createElement("img");
    profilePictureEl.src = `${user.profile_image}`;
    profilePictureEl.classList.add("profile-picture");
    reviewHeaderEl.appendChild(profilePictureEl);

    //from user.json
    const usernameEl = document.createElement("p");
    usernameEl.classList.add("user");
    usernameEl.innerText = `${user.username}`;
    reviewHeaderEl.appendChild(usernameEl);

    const dateEl = document.createElement("p");
    dateEl.innerText = `${review.date}`;
    dateEl.classList.add("review-date");
    reviewPostEl.appendChild(dateEl);

    const titleEl = document.createElement("h3");
    titleEl.innerText = `${review.title}`;
    titleEl.classList.add("review-title");
    reviewPostEl.appendChild(titleEl);

    const textEl = document.createElement("p");
    textEl.innerText = `${review.text}`;
    textEl.classList.add("review-text");
    reviewPostEl.appendChild(textEl);

    return reviewPostEl;
}

function createReviewForm(animeId) {
    const formEl = document.createElement("form");
    formEl.id = "review-form";
    formEl.classList.add("review-form");
    reviewContainerEl.appendChild(formEl);

    const titleLabelEl = document.createElement("label");
    titleLabelEl.setAttribute("for", "title");
    titleLabelEl.classList.add("label-title");
    titleLabelEl.innerText = "Review Title:";
    formEl.appendChild(titleLabelEl);

    const titleInputEl = document.createElement("input");
    titleInputEl.type = "text";
    titleInputEl.id = "review-title";
    titleInputEl.name = "title";
    titleInputEl.placeholder = "Write your title here";
    titleInputEl.classList.add("review-input-title");
    formEl.appendChild(titleInputEl);

    const reviewLabelEl = document.createElement("label");
    reviewLabelEl.setAttribute("for", "review");
    reviewLabelEl.innerText = "Review Text:";
    reviewLabelEl.classList.add("label-review");
    formEl.appendChild(reviewLabelEl);

    const reviewInputEl = document.createElement("textarea");
    reviewInputEl.id = "review-content";
    reviewInputEl.name = "review";
    reviewInputEl.placeholder = "Write your review here";
    reviewInputEl.classList.add("review-input-content");
    formEl.appendChild(reviewInputEl);

    const submitBtn = document.createElement("button");
    submitBtn.type = "button";
    submitBtn.classList.add("review-submit-button")
submitBtn.addEventListener('click', () => {
    const review_turtle = document.getElementById("review-title");
    const review_content = document.getElementById("review-content");

    const userData = localStorage.getItem("user");

    if (!review_turtle.value || !review_content.value) {
        alert('Please fill in both the title and content.');
        return;
    }

    if (userData) {
        const user = JSON.parse(userData);
        const newReview = {
            anime_id: animeId,
            user_id: user.user_id,
            title: review_turtle.value,
            text: review_content.value,
            date: currentDate
        };

        localStorage.setItem("user_review", JSON.stringify(newReview));
        
        window.location.href = `details.html?id=${animeId}#review-container`;
    } else {
        alert('User data is missing. Please log in or register.');
    }
});
    submitBtn.innerText = "Submit Review";
    formEl.appendChild(submitBtn);
}

function renderContent() {
    // Getting the correct anime to load
    const animeId = parseInt(getAnimeIdFromURL());
    const anime = animes.find(a => a.id === animeId);

    // Straight from ChatGPT
    if (!anime) {
        topSectionEl.innerHTML = '<p>Anime not found.</p>';
        return;
    }
    else
    {
        // Getting the matching characters to the anime
        const matchingCharacters = characters.filter(c => c.anime_id === animeId);

        // Getting the matching reviews to the anime
        const matchingReviews = reviews.filter(r => r.anime_id === animeId);    

        topSectionEl.innerHTML = "";
        // this innertext is static text on the website
        episodesTitleEl.innerHTML = "Episodes:";
        datesTitleEl.innerHTML = "Dates:";
        plotTitleEl.innerHTML = "Plot:";
        characterContainerEl.innerHTML = "";
        reviewContainerEl.innerHTML = "";
        // trailerContainerEl.innerHTML = "";



        createAnimeDetails(anime);
        createCharacterDetails(matchingCharacters);
        createReviewForm(animeId);
        for (let review of matchingReviews) {
            const user = getUserById(review.user_id);
            const reviewElement = createReviewDetails(review, user);
            reviewContainerEl.appendChild(reviewElement);
        }
        if (anime.trailer_url) {
            const iframeEl = document.createElement("iframe");
            iframeEl.src = anime.trailer_url;
            iframeEl.classList.add("trailer");
            iframeEl.setAttribute("frameborder", "0");
            iframeEl.setAttribute("allowfullscreen", "true");
            trailerContainerEl.appendChild(iframeEl);
        }   else {
            trailerContainerEl.innerHTML = `<p>No trailer available.</p>`;
        }
    }

}

loadData();