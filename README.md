# Disney+ Hotstar Clone 🚀

![School Logo](https://raw.githubusercontent.com/khushb003/HOTSTAR-CLONE/refs/heads/main/public/images/banner.png)

This is a school project that clones the front-end and core functionality of the Disney+ Hotstar streaming platform. It is built with a modern stack, featuring a Node.js backend to securely serve API keys and a dynamic, responsive front-end built with Tailwind CSS and JavaScript.

The application fetches real-time movie and show data from **The Movie Database (TMDB) API** to populate the UI.

## ✨ Features

- **Dynamic API Content:** All content (carousel, movie rows) is fetched from the TMDB API, not hard-coded.
- **Secure API Key:** The Node.js/Express server serves the secret API key from a `.env` file, keeping it hidden from the client.
- **Collapsible Sidebar:** A signature Hotstar/Disney+ vertical sidebar that is icon-only and expands on hover.
- **Full-Screen Hero Carousel:** A full-height, API-driven carousel (powered by Flowbite) for featured content.
- **Movie Carousels:** Horizontal scrolling rows for "Recommended," "Popular," and "Family" content.
- **Hover-to-Show Metadata:** Movie cards are clean thumbnails that reveal movie details and a watchlist button on hover.
- **Trailer Modal:** Clicking a movie card opens a Flowbite modal, fetches the movie's official YouTube trailer, and plays it.
- **Smooth Animations:** Page-load and UI animations are powered by GSAP.

---

## 💻 Tech Stack

- **Frontend:**
  - HTML5
  - Tailwind CSS
  - JavaScript (Client-side)
  - [Flowbite](https://flowbite.com/) (Carousel & Modal components)
  - [GSAP](https://gsap.com/) (Animations)
  - [Font Awesome](https://fontawesome.com/) (Icons)
- **Backend:**
  - Node.js
  - Express.js
  - `dotenv` (for environment variables)
- **API:**
  - [The Movie Database (TMDB)](https://www.themoviedb.org/)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You must have [Node.js](https://nodejs.org/) installed on your computer.

### 1\. Clone the Repository

```bash
git clone https://github.com/khushb003/HOTSTAR-CLONE.git
cd HOTSTAR-CLONE
```

### 2\. Install Dependencies

This will install all necessary packages for both the server (Express) and development (Tailwind).

```bash
npm install
```

### 3\. Set Up Environment Variables

This is the most important step for the API to work.

1.  Create a new file named `.env` in the **root** of your project (at the same level as `server.js`).

2.  Go to [TMDB](https://www.themoviedb.org/signup) and create a free account.

3.  Go to your **Settings → API** and copy your **API Key (v3 auth)**.

4.  Paste the key into your `.env` file like this:

    ```
    TMDB_API_KEY=your_secret_api_key_goes_here
    ```

### 4\. Run the Project

You'll need to run two commands in two separate terminal windows:

- **Terminal 1 (Build CSS):**
  This command starts the Tailwind CLI, which watches your `input.css` file and automatically rebuilds `style.css` every time you make a change.

  ```bash
  npm run build:css
  ```

- **Terminal 2 (Start Server):**
  This command starts your local Express server, which serves your `public` folder and the API key.

  ```bash
  npm start
  ```

  _If you have `nodemon` installed (as shown in your `package.json`), you can use `npm run dev` to have the server restart automatically on changes._

### 5\. View Your App

Open your browser and go to:
**[http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)**

---

## 📁 Project Structure

```
your-project/
│
├── server.js           # The Express server (serves files & API key)
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind theme & plugin configuration
├── .env                # (You must create this) Stores secret API keys
│
└── public/             # All client-side files are served from here
    ├── index.html      # The main HTML skeleton
    ├── app.js          # Main JavaScript (API fetching, modals, animations)
    ├── style.css       # The GENERATED Tailwind output file
    │
    └── src/
        └── input.css   # The Tailwind source file you EDIT
```
