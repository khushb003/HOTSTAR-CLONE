let movies = [
  {
    name: "Loki",
    des: "Loki is an American television series created by Michael Waldron for the streaming service Disney.",
    image: "./images/loki marvel.jpg",
  },
  {
    name: "Falcon and the Winter Soldier",
    des: "Falcon and the Winter Soldier is an American television series created for the streaming platform Disney+.",
    image: "./images/winter solider.jpg",
  },
  {
    name: "Titanic",
    des: "Titanic is an epic romance and disaster film about a young couple from different social classes who fall in love aboard the ill-fated RMS Titanic.",
    image: "./images/titanic.jpg",
  },
  {
    name: "Maleficent",
    des: "Maleficent tells the untold story of Disney’s most iconic villain and the betrayal that turned her heart to stone.",
    image: "./images/meleficent.jpg",
  },
  {
    name: "snow white",
    des: "Anora, a Brooklyn stripper, finds her life upended after marrying a Russian oligarch’s son, leading to chaos and self-discovery.",
    image: "./images/anora1.jpg",
  },
];

const carousel = document.querySelector(".carousel");
let sliders = [];
let slideIndex = 0;

const createSlider = () => {
  if (slideIndex >= movies.length) {
    slideIndex = 0;
  }

  // Create DOM elements
  let slide = document.createElement("div");
  let imgElement = document.createElement("img");
  let content = document.createElement("div");
  let h1 = document.createElement("h1");
  let p = document.createElement("p");

  // Add movie details
  h1.appendChild(document.createTextNode(movies[slideIndex].name));
  p.appendChild(document.createTextNode(movies[slideIndex].des));
  content.appendChild(h1);
  content.appendChild(p);
  slide.appendChild(content);
  slide.appendChild(imgElement);
  carousel.appendChild(slide);

  // Set image source
  imgElement.src = movies[slideIndex].image;

  // Set classes
  slide.className = "slider";
  content.className = "slide-content";
  h1.className = "movie-title";
  p.className = "movie-des";

  sliders.push(slide);
  slideIndex++;

  // Move slides to create animation effect
  if (sliders.length) {
    sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${
      30 * (sliders.length - 2)
    }px)`;
  }
};

// Create first 3 slides immediately
for (let i = 0; i < 3; i++) {
  createSlider();
}

// Automatically create more slides every 3 seconds
setInterval(() => {
  createSlider();
}, 3000);
