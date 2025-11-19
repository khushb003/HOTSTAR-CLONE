let API_KEY;

const API_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

// (ENDPOINTS object remains the same as before)
const ENDPOINTS = {
  trending: "/trending/movie/week",
  topRated: "/movie/top_rated",
  popular: "/movie/popular",
  familyAnimation: "/discover/movie?with_genres=10751&with_genres=16",
};

// --- NEW FUNCTION: Get API Key ---
/**
 * Fetches the API key from our own server.
 */
async function getApiKey() {
  try {
    const response = await fetch("/api/config");
    if (!response.ok) {
      throw new Error("Could not fetch API config");
    }
    const config = await response.json();
    API_KEY = config.apiKey;

    if (!API_KEY) {
      throw new Error("API Key is missing from config");
    }
  } catch (error) {
    console.error("CRITICAL: Failed to load API Key.", error);
    alert("Failed to load website configuration. Please try again later.");
  }
}

// (fetchData function remains the same, using the fixed 'separator')
async function fetchData(endpoint) {
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${API_BASE_URL}${endpoint}${separator}api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Updated error logging to be more helpful
      console.error(`API Error: ${response.status} for URL: ${url}`);
      return null;
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

/**
 * Creates an HTML string for a single movie card.
 * @param {Object} movie - The movie object from the TMDB API.
 * @returns {string} - The HTML string for the movie card.
 */
function createMovieCard(movie) {
  const title = movie.title || movie.name || "Movie Title";
  const overview = movie.overview || "No description available.";
  const posterPath = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return `
    <div class="movie-card flex-shrink-0 w-44 h-auto">
      <!-- ONLY this div should be the group -->
      <div class="relative group w-full rounded-lg overflow-hidden shadow-lg 
                  transform hover:scale-105 transition-transform duration-300
                  border border-gray-700/50">
          
        <a href="/movie.html?id=${movie.id}" class="block">
          <img class="w-full h-full object-cover aspect-[2/3]"
               src="${posterPath}"
               alt="${title} poster" />
        </a>

        <!-- This part will show only when THIS card is hovered -->
        <div class="absolute bottom-0 left-0 right-0 p-4
                    bg-gradient-to-t from-black/90 via-black/70 to-transparent
                    opacity-0 group-hover:opacity-100
                    translate-y-4 group-hover:translate-y-0
                    transition-all duration-300 ease-in-out">

          <h5 class="mb-1 text-lg font-bold tracking-tight text-white truncate"
              title="${title}">
            ${title}
          </h5>

          <p class="mb-2 font-normal text-sm text-gray-300 line-clamp-2">
            ${overview}
          </p>

          <a href="/movie.html?id=${movie.id}" class="w-full text-white bg-hotstar-blue hover:bg-hotstar-blue/90
                         focus:ring-2 focus:ring-hotstar-blue font-medium rounded-lg
                         text-sm px-3 py-2 text-center">
            <i class="fa-solid fa-play"></i> Watch Now
          </a>

        </div>
      </div>
    </div>
  `;
}

/**
 * Populates a movie row in the HTML.
 * @param {string} containerId - The ID of the container element.
 * @param {Array<Object>} movies - The array of movie objects.
 */
function populateMovieRow(containerId, movies) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container with ID ${containerId} not found.`);
    return;
  }

  // Clear any existing content
  container.innerHTML = "";

  // Create a card for each movie
  movies.forEach((movie) => {
    const cardHtml = createMovieCard(movie);
    container.innerHTML += cardHtml;
  });
}

/**
 * Populates the main Flowbite carousel.
 * @param {Array<Object>} movies - An array of movies (we'll use the first 4).
 */
function populateCarousel(movies) {
  const carouselItems = document.querySelectorAll("[data-carousel-item]");

  // We only need the first few movies for the carousel
  const carouselMovies = movies.slice(0, carouselItems.length);

  carouselItems.forEach((item, index) => {
    const movie = carouselMovies[index];
    if (!movie) return; // Skip if we don't have a movie for this slide

    const title = movie.title || movie.name || "Movie Title";
    const overview = movie.overview || "No description available.";
    const backdropPath = movie.backdrop_path
      ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
      : "https://via.placeholder.com/1920x1080?text=No+Image";

    // Find the elements inside this specific carousel item and update them
    const imgElement = item.querySelector("img");
    const titleElement = item.querySelector("h1");
    const descElement = item.querySelector("p");

    if (imgElement) {
      imgElement.src = backdropPath;
      imgElement.alt = title;
    }
    if (titleElement) {
      titleElement.textContent = title;
    }
    if (descElement) {
      descElement.textContent = overview;
    }
  });
}

// --- 3. Page Controls & Animations ---

/**
 * Scrolls a horizontal movie row.
 * @param {string} containerId - The ID of the container to scroll.
 * @param {string} direction - 'prev' or 'next'.
 */
function scrollRow(containerId, direction) {
  const container = document.getElementById(containerId);
  if (container) {
    // Scroll by 80% of the container's visible width
    const scrollAmount = container.clientWidth * 0.8;

    if (direction === "prev") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }
}

/**
 * Initializes all GSAP animations.
 */
function initAnimations() {
  // --- THIS IS THE CHANGE ---
  // Animate Sidebar (was #navbar)
  gsap.from("#sidebar", {
    duration: 1,
    x: -256, // Animate from the left (x-axis) instead of y-axis
    opacity: 0,
    ease: "power3.out",
  });
  // --- END OF CHANGE ---

  // Animate Main Carousel
  gsap.from("#main-carousel", {
    duration: 1,
    delay: 0.5,
    opacity: 0,
    ease: "power3.inOut",
  });

  // Animate Brand Cards (was .video-card)
  gsap.to(".brand-card", {
    duration: 0.8,
    delay: 1.0,
    y: 0,
    opacity: 1,
    stagger: 0.1,
    ease: "power3.out",
  });

  // Animate Movie Lists
  gsap.from(".movie-list-section", {
    duration: 1,
    delay: 1.5,
    y: 50,
    opacity: 0,
    stagger: 0.3,
    ease: "power3.out",
  });
}

async function fetchMovieDetails(movieId = 1054867) {
  // Construct the endpoint for a single movie's details
  const endpoint = `/movie/${movieId}`;

  // Construct the full URL with the API key
  const url = `${API_BASE_URL}${endpoint}?api_key=95a8b91a22c3478263aa19d542f25fc3`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`API Error: ${response.status} for URL: ${url}`);
      return null;
    }

    const data = await response.json();

    // IMPORTANT: Unlike the previous function, this endpoint returns the
    // movie detail object DIRECTLY, not wrapped in a 'results' array.
    console.log(data);
    return data; // Returns the full movie object
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}
// --- 4. Main Initialization ---

async function initializePage() {
  // 1. We MUST get the API key before doing anything else
  await getApiKey();

  // 2. If the API key failed to load, stop.
  if (!API_KEY) {
    console.error("CRITICAL: API Key not loaded. Halting page load.");
    return;
  }

  // 3. Now that we have the key, fetch all data in parallel
  const [trending, topRated, popular, familyAnimation] = await Promise.all([
    fetchData(ENDPOINTS.trending),
    fetchData(ENDPOINTS.topRated),
    fetchData(ENDPOINTS.popular),
    fetchData(ENDPOINTS.familyAnimation),
  ]);

  // 4. Populate the page
  if (trending) populateCarousel(trending);
  if (topRated) populateMovieRow("recommended-container", topRated);
  if (popular) populateMovieRow("popular-container", popular);
  if (familyAnimation) populateMovieRow("family-container", familyAnimation);

  // 5. Run animations
  initAnimations();
}

let something = fetchMovieDetails();

// Wait for the DOM to be fully loaded before running our script
document.addEventListener("DOMContentLoaded", initializePage);

// Make the scroll function available globally so HTML onclick can find it
window.scrollRow = scrollRow;
