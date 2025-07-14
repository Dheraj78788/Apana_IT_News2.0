// api/news.js  (ES Modules; Node 18 on Vercel)
export default async function handler(request, response) {
    // 1️⃣ grab query string exactly as the browser sent it
    const qs = request.url.split('?')[1] ?? '';
  
    // 2️⃣ build the NewsAPI URL (v2 supports both top-headlines & everything)
    const newsURL = `https://newsapi.org/v2/${qs.includes('q=') ? 'everything' : 'top-headlines'}?${qs}`;
  
    try {
      const r = await fetch(newsURL, {
        headers: { 'X-Api-Key': process.env.NEWS_KEY }  // 🔒
      });
      const data = await r.json();
      // 3️⃣ pass JSON straight back to the browser
      response.status(200).json(data);
    } catch (err) {
      console.error(err);
      response.status(500).json({ status: 'error', message: 'NewsAPI fetch failed' });
    }
  }
  