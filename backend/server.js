import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/proxy", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "Missing url" });

  try {
    const response = await fetch(videoUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://fxpy7.watching.onl/",
        "Origin": "https://fxpy7.watching.onl/",
      },
    });

    if (!response.ok) {
      console.error("Fetch failed:", response.status, response.statusText);
      return res.status(response.status).json({ error: "Failed to fetch" });
    }

    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    res.setHeader("Cache-Control", "no-cache");

    response.body.pipe(res);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy streaming failed" });
  }
});

app.listen(3001, () => console.log("✅ Proxy running at http://localhost:3001"));
