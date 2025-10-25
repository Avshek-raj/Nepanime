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
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
        "Referer": "https://watching.onl/",
        "Origin": "https://watching.onl",
      },
    });

    const contentType = response.headers.get("content-type");

    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Content-Type", contentType || "application/octet-stream");

    // If this is an .m3u8 playlist, rewrite segment URLs to route via proxy
    if (contentType && contentType.includes("application/vnd.apple.mpegurl")) {
      const text = await response.text();
      const baseUrl = new URL(videoUrl).origin;

      // Rewrite each .ts or .m3u8 reference to go through our proxy
      const rewritten = text.replace(
        /((https?:\/\/[^\s]+)|([^\s]+\.ts))/g,
        (match) => {
          const absoluteUrl = match.startsWith("http")
            ? match
            : `${baseUrl}${match.startsWith("/") ? match : "/" + match}`;
          return `/api/proxy?url=${encodeURIComponent(absoluteUrl)}`;
        }
      );

      res.send(rewritten);
    } else {
      // Stream binary data for .ts, .key, etc.
      response.body.pipe(res);
    }
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy streaming failed" });
  }
});

app.listen(3001, () =>
  console.log("✅ Proxy server running on http://localhost:3001")
);
