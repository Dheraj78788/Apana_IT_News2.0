// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;
const NEWS_API_KEY = process.env.NEWS_KEY || "your_fallback_api_key_here"; // optional fallback

// Middleware
app.use(cors());
app.use(express.json()); // for future POST/PUT support
app.use(express.static("public")); // serve static files like favicon or index.html

// ✅ API route: GET /news?q=ai
app.get("/news", async (req, res) => {
  const query = req.query.q || "technology";
  const url = "https://newsapi.org/v2/everything";

  try {
    const response = await axios.get(url, {
      params: {
        q: query,
        apiKey: NEWS_API_KEY,
        language: "en",
        pageSize: 10, // limit results
        sortBy: "publishedAt"
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("🛑 News API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// ✅ Root route (health check)
app.get("/", (_req, res) => {
  res.send("🚀 Backend alive");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
