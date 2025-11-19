require("dotenv").config();
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'public' folder
app.use("/", express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.png")));

// === API: Expose Safe Config ===
app.get("/api/config", (req, res) => {
  res.json({
    apiKey: process.env.TMDB_API_KEY || null,
  });
});

// === START SERVER ===
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
