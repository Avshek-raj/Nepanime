// /api/proxy.js
export default async function handler(req, res) {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "Missing url" });

  try {
    const response = await fetch(videoUrl, {
      headers: {
        // Cloudflare bypass headers
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
        "Referer": "https://watching.onl/",
        "Origin": "https://watching.onl",
      },
    });

    // Keep content-type (HLS, MP4, etc.)
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/octet-stream"
    );

    // Stream response directly for HLS chunks
    response.body.pipe(res);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy streaming failed" });
  }
}
