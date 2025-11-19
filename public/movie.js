const API_BASE_URL = "https://api.themoviedb.org/3";
let API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

// --- DOM Elements ---
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error-message");
const errorTextEl = document.getElementById("error-text");
const detailsEl = document.getElementById("movie-details");
const watchNowBtn = document.getElementById("watch-now-btn");

// --- Utility Functions ---
async function getApiKey() {
  try {
    const response = await fetch("/api/config");
    if (!response.ok) throw new Error("Could not fetch API config");
    const config = await response.json();
    API_KEY = config.apiKey;
    if (!API_KEY) throw new Error("API Key is missing from config");
  } catch (error) {
    console.error("CRITICAL: Failed to load API Key.", error);
    showError("Failed to load website configuration.");
  }
}

async function fetchData(endpoint) {
  const url = `${API_BASE_URL}${endpoint}?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

function formatRuntime(totalMinutes) {
  if (!totalMinutes) return "N/A";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function formatCurrency(amount) {
  if (!amount || amount === 0) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function showError(message) {
  loadingEl.classList.add("hidden");
  detailsEl.classList.add("hidden");
  errorEl.classList.remove("hidden");
  errorTextEl.textContent = message;
}

// --- Main Rendering Functions ---

function renderMovieDetails(movie) {
  // Basic Info
  document.getElementById("movie-title").textContent = movie.title;
  const taglineEl = document.getElementById("movie-tagline");
  if (movie.tagline) {
    taglineEl.textContent = `"${movie.tagline}"`;
  } else {
    taglineEl.classList.add("hidden");
  }
  document.getElementById("movie-overview").textContent = movie.overview;

  // Images
  if (movie.poster_path) {
    document.getElementById(
      "poster-img"
    ).src = `${IMAGE_BASE_URL}${movie.poster_path}`;
  }
  if (movie.backdrop_path) {
    document.getElementById(
      "backdrop-img"
    ).style.backgroundImage = `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`;
  }

  // Update "Watch Now" link if homepage exists, otherwise IMDB
  const watchUrl =
    movie.homepage || `https://www.imdb.com/title/${movie.imdb_id}`;
  if (watchUrl) {
    watchNowBtn.href = watchUrl;
  }

  // Sidebar / Stats
  document.getElementById("movie-runtime").textContent = formatRuntime(
    movie.runtime
  );
  document.getElementById("movie-release-date").textContent =
    movie.release_date || "N/A";

  document.getElementById("movie-rating").textContent = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";
  document.getElementById("vote-count").textContent = movie.vote_count
    ? `(${movie.vote_count.toLocaleString()} votes)`
    : "";

  document.getElementById("movie-budget").textContent = formatCurrency(
    movie.budget
  );
  document.getElementById("movie-revenue").textContent = formatCurrency(
    movie.revenue
  );
  document.getElementById("movie-original-lang").textContent =
    movie.original_language || "N/A";

  // Genres
  const genresEl = document.getElementById("movie-genres");
  genresEl.innerHTML = "";
  if (movie.genres && movie.genres.length > 0) {
    movie.genres.forEach((genre) => {
      const span = document.createElement("span");
      // Hotstar-like genre badge style
      span.className =
        "bg-transparent text-gray-200 text-sm px-3 rounded-full backdrop-blur-md";
      span.textContent = genre.name;
      genresEl.appendChild(span);
    });
  } else {
    genresEl.textContent = "N/A";
  }

  loadingEl.classList.add("hidden");
  detailsEl.classList.remove("hidden");
}

async function renderMovieTrailer(movieId) {
  const videoData = await fetchData(`/movie/${movieId}/videos`);
  const trailerContainerEl = document.getElementById("trailer-container");
  const noTrailerEl = document.getElementById("no-trailer-message");

  if (videoData && videoData.results && videoData.results.length > 0) {
    // Find the official trailer on YouTube
    const trailer =
      videoData.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      ) || videoData.results.find((video) => video.site === "YouTube");

    if (trailer) {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", "100%");
      // FIXED: Added 'autoplay=1&mute=1' to parameters
      iframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`
      );
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      );
      iframe.setAttribute("allowfullscreen", "");
      iframe.classList.add("absolute", "inset-0");

      trailerContainerEl.innerHTML = ""; // Clear placeholder
      trailerContainerEl.appendChild(iframe);
      return;
    }
  }

  noTrailerEl.classList.remove("hidden");
}

// --- Initialization ---

async function init() {
  await getApiKey();

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (!movieId) {
    showError("No movie ID provided in URL. (e.g. ?id=12345)");
    return;
  }

  // Fetch details
  const movieDetails = await fetchData(`/movie/${movieId}`);

  if (!movieDetails) {
    showError(`Failed to fetch details for Movie ID: ${movieId}`);
    return;
  }

  // Render everything
  renderMovieDetails(movieDetails);
  renderMovieTrailer(movieId);
}

init();
