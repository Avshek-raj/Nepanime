import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'https://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.get("/api/video-proxy", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing URL");

  try {
    const response = await fetch(url, {
      headers: {
        "Referer": "https://mgstatics.xyz/",
        "Origin":  "https://mgstatics.xyz/",
        "User-Agent": "Mozilla/5.0"
      },
    });

    // Set CORS headers explicitly
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    
    // For VTT files, set proper content type
    if (url.includes('.vtt')) {
      res.setHeader("Content-Type", "text/vtt; charset=utf-8");
    } else {
      res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    }

    response.body.pipe(res);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));