export default async function handler(req, res) {
  try {
    const videoUrl = req.query.url;

    if (!videoUrl) {
      return res.status(400).json({ error: "Missing 'url' query parameter" });
    }

    const response = await fetch(videoUrl, {
      headers: {
        // Helps trick Cloudflare into thinking it’s a browser request
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
        "Referer": "https://watching.onl/",
        "Origin": "https://watching.onl",
      },
    });

    // Copy content-type headers (important for .m3u8 or .ts chunks)
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");

    // Stream the response
    const arrayBuffer = await response.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to proxy video" });
  }
}
