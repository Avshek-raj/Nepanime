// src/ui/VideoPlayer.jsx
import { useEffect, useRef } from "react";
import Hls from "hls.js";

export const VideoPlayer = ({ videoUrl= "https://fxpy7.watching.onl/anime/603a7cc07fd43fa7caaf863203a6ce89/caebb7e0bd325936c9c8b6c0d5e6903d/master.m3u8", subtitleUrl="https://mgstatics.xyz/subtitle/5c6468b280a88e1c9dc396faa952b2e9/5c6468b280a88e1c9dc396faa952b2e9.vtt" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoUrl) return;

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari supports HLS natively
      video.src = videoUrl;
    }
  }, [videoUrl]);

  return (
    <video
      ref={videoRef}
      controls
      className="w-full rounded-md bg-black"
      crossOrigin="anonymous"
    >
      {subtitleUrl && (
        <track
          src={subtitleUrl}
          kind="subtitles"
          srcLang="en"
          label="English"
          default
        />
      )}
    </video>
  );
};
