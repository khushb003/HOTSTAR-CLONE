require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'public' folder
app.use("/", express.static(path.join(__dirname, "public")));

// API endpoint to send the API key to the client
app.get("/api/config", (req, res) => {
  res.json({
    apiKey: process.env.TMDB_API_KEY,
  });
});

module.exports = app;
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
