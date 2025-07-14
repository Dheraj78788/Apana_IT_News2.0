// api/index.js
const express = require("express");
const cors    = require("cors");
const axios   = require("axios");

const app  = express();
const NEWS = process.env.NEWS_KEY;           // set on Vercel

app.use(cors());
app.use(express.json());

// GET  /api/news?q=ai        (default q = techcrunch headlines)
app.get("/api/news", async (req, res) => {
  const q = req.query.q || "";
  const endpoint = q
      ? "https://newsapi.org/v2/everything"
      : "https://newsapi.org/v2/top-headlines";

  const params = q
      ? { q, language: "en", sortBy: "publishedAt", pageSize: 24, apiKey: NEWS }
      : { sources: "techcrunch", apiKey: NEWS };

  try {
    const { data } = await axios.get(endpoint, { params });
    res.json(data);
  } catch (e) {
    console.error("News API error:", e.message);
    res.status(502).json({ error: "Failed to fetch NewsAPI data" });
  }
});

// health‑check
app.get("/", (_req, res) => res.send("🚀 Backend alive"));

module.exports = app;   // ‼️  required for @vercel/node
