// server.js  (CommonJS style)
const express = require("express");
const cors    = require("cors");
const axios   = require("axios");
require("dotenv").config();

const app  = express();
const PORT = process.env.PORT || 3000;
const KEY  = process.env.NEWS_KEY;      // 966f8d089b2b4232b03bbf661ca16965

app.use(cors());

// GET /news?q=ai
app.get("/news", async (req, res) => {
  const q = req.query.q || "technology";
  try {
    const { data } = await axios.get("https://newsapi.org/v2/everything", {
      params: { q, apiKey: KEY }
    });
    res.json(data);
  } catch (err) {
    console.error("News API error:", err.message);
    res.status(500).json({ error: "API error" });
  }
});

// optional root health‑check
app.get("/", (_req, res) => res.send("🚀 Backend alive"));

app.listen(PORT, () =>
  console.log(`🚀  Server running on http://localhost:${PORT}`)
);
