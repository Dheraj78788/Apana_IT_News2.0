const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const NEWS_API_KEY = process.env.NEWS_KEY;

app.use(cors());
app.use(express.json());

// GET /api/news?q=ai
app.get("/api/news", async (req, res) => {
  const q = req.query.q || "technology";
  try {
    const { data } = await axios.get("https://newsapi.org/v2/everything", {
      params: { q, apiKey: NEWS_API_KEY },
    });
    res.json(data);
  } catch (err) {
    console.error("News API error:", err.message);
    res.status(500).json({ error: "API error" });
  }
});

app.get("/", (_req, res) => res.send("🚀 Backend alive"));

module.exports = app;
