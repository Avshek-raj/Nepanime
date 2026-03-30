import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { MdSubtitles, MdClosedCaption } from "react-icons/md";

const VideoPlayer = ({ videoData }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);

  // Controls state
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  // Loader and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Subtitle state
  const [subtitles, setSubtitles] = useState([]);
  const [selectedSubtitleIdx, setSelectedSubtitleIdx] = useState(-1);
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false);

  // Load HLS.js library
  useEffect(() => {
    if (window.Hls) return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
    script.onload = () => console.log("HLS.js loaded");
    script.onerror = () => console.error("Failed to load HLS.js");
    document.head.appendChild(script);
  }, []);

  // Setup video when videoData changes
  useEffect(() => {
    if (!videoData?.sources?.[0]?.url) {
      setError("No video source available");
      return;
    }

    const setupVideo = () => {
      const video = videoRef.current;
      if (!video) return;

      // Reset state
      setError(null);
      setIsLoading(true);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setSelectedSubtitleIdx(-1);

      // Clean up existing HLS instance
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      // Clear the video
      video.src = "";
      video.innerHTML = "";

      // Setup subtitles
      if (videoData.subtitles && Array.isArray(videoData.subtitles)) {
        const langSubs = videoData.subtitles.filter(
          (s) => s.lang && s.lang.toLowerCase() !== "thumbnails"
        );
        setSubtitles(langSubs);
      } else {
        setSubtitles([]);
      }

      const videoUrl = videoData.sources[0].url;

      // Initialize HLS
      if (window.Hls && window.Hls.isSupported()) {
        const hls = new window.Hls({
          enableWorker: true,
          lowLatencyMode: false,
          maxBufferLength: 30,
          maxMaxBufferLength: 600,
        });

        hls.loadSource(videoUrl);
        hls.attachMedia(video);

        hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
          console.log("HLS manifest loaded");
        });

        hls.on(window.Hls.Events.ERROR, (event, data) => {
          console.error("HLS Error:", data);
          if (data.fatal) {
            switch (data.type) {
              case window.Hls.ErrorTypes.NETWORK_ERROR:
                setError("Network error. Please check your connection.");
                break;
              case window.Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                setError("Unable to load video.");
                break;
            }
          }
          setIsLoading(false);
        });

        hlsRef.current = hls;
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari native HLS
        video.src = videoUrl;
        setIsLoading(false);
      } else {
        setError("HLS not supported on this browser");
        setIsLoading(false);
      }
    };

    setupVideo();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoData]);

  // Add subtitle tracks
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Remove all existing tracks
    const existingTracks = video.querySelectorAll("track");
    existingTracks.forEach((t) => t.remove());

    if (subtitles.length === 0) return;

    // Add new subtitle tracks with blob URLs
    const addSubtitleTracks = async () => {
      for (let index = 0; index < subtitles.length; index++) {
        const subtitle = subtitles[index];
        let blobUrl = null;
        
        try {
          // First, try direct fetch with CORS
          const response = await fetch(subtitle.url, {
            mode: 'cors',
            credentials: 'omit',
          });
          
          if (response.ok) {
            const blob = await response.blob();
            blobUrl = URL.createObjectURL(blob);
          }
        } catch (directError) {
          // If direct fetch fails, try through the backend proxy
          try {
            const proxyUrl = `/api/video-proxy?url=${encodeURIComponent(subtitle.url)}`;
            const response = await fetch(proxyUrl, {
              mode: 'cors',
              credentials: 'omit',
            });
            
            if (response.ok) {
              const blob = await response.blob();
              blobUrl = URL.createObjectURL(blob);
            }
          } catch (proxyError) {
            console.warn(`Failed to load subtitle ${subtitle.lang}:`, directError, proxyError);
          }
        }

        if (blobUrl) {
          const track = document.createElement("track");
          track.kind = "captions";
          track.label = subtitle.lang;
          track.srclang = subtitle.lang.split("-")[0].toLowerCase();
          track.src = blobUrl;
          video.appendChild(track);
        }
      }

      // Set track modes
      setTimeout(() => {
        const tracks = video.querySelectorAll("track");
        tracks.forEach((track, idx) => {
          track.track.mode = idx === selectedSubtitleIdx ? "showing" : "hidden";
        });
      }, 50);
    };

    addSubtitleTracks();

    return () => {
      // Clean up blob URLs
      const tracks = video.querySelectorAll("track");
      tracks.forEach((track) => {
        if (track.src && track.src.startsWith("blob:")) {
          URL.revokeObjectURL(track.src);
        }
      });
    };
  }, [subtitles, selectedSubtitleIdx]);

  // Auto-hide controls
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [isPlaying]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) setShowControls(false);
  }, [isPlaying]);

  // Video event handlers
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const handleProgress = useCallback(() => {
    if (videoRef.current && videoRef.current.buffered.length > 0) {
      setBuffered(videoRef.current.buffered.end(0));
    }
  }, []);

  const handleSeek = useCallback((e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, []);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!videoRef.current.muted);
    }
  }, []);

  const skipSeconds = useCallback((seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        Math.min(duration, videoRef.current.currentTime + seconds)
      );
    }
  }, [duration]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.error("Fullscreen error:", err));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  }, []);

  const handleSubtitleSelect = useCallback((index) => {
    setSelectedSubtitleIdx(index);
    setShowSubtitleMenu(false);

    const video = videoRef.current;
    if (!video) return;

    const tracks = video.querySelectorAll("track");
    tracks.forEach((track, idx) => {
      track.track.mode = idx === index ? "showing" : "hidden";
    });
  }, []);

  const handleToggleSubtitles = useCallback(() => {
    if (selectedSubtitleIdx >= 0) {
      setSelectedSubtitleIdx(-1);
      const video = videoRef.current;
      if (video) {
        const tracks = video.querySelectorAll("track");
        tracks.forEach((track) => {
          track.track.mode = "hidden";
        });
      }
    }
  }, [selectedSubtitleIdx]);

  const formatTime = (seconds) => {
    if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
      return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration ? (buffered / duration) * 100 : 0;

  return (
    <div
      className="relative w-full h-full bg-black rounded-lg overflow-hidden group"
      ref={containerRef}
      style={{ aspectRatio: "16/9" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full bg-black absolute inset-0 object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onProgress={handleProgress}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        Your browser does not support the video tag.
      </video>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg z-20">
          <div className="text-center">
            <div className="inline-block mb-4">
              <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-white text-sm">Loading video...</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded-lg z-20">
          <div className="text-center max-w-xs">
            <p className="text-red-500 font-semibold text-lg mb-2">⚠️ Error</p>
            <p className="text-gray-300 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Player Controls */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none flex flex-col justify-end ${
          showControls ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        style={{ zIndex: 10 }}
      >
        {/* Progress Bar BG */}
        <div className="pointer-events-auto px-2 pb-12">
          {/* Hover time tooltip */}
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden group cursor-pointer">
            {/* Buffered */}
            <div
              className="absolute h-full bg-gray-600"
              style={{ width: `${bufferedPercent}%` }}
            ></div>
            {/* Progress */}
            <div
              className="absolute h-full bg-gradient-to-r from-purple-600 to-purple-400"
              style={{ width: `${progressPercent}%` }}
            ></div>
            {/* Slider */}
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              style={{ zIndex: 5 }}
            />
            {/* Scrubber dot */}
            <div
              className="absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-lg transform -translate-y-1/2"
              style={{ left: `${progressPercent}%`, zIndex: 6 }}
            ></div>
          </div>

          {/* Time display */}
          <div className="flex justify-between text-white text-xs mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="pointer-events-auto bg-gradient-to-t from-black via-black/80 to-transparent px-2 sm:px-4 py-3">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlayPause}
              className="text-white hover:text-purple-400 transition-colors flex-shrink-0"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
            </button>

            {/* Skip Back */}
            <button
              onClick={() => skipSeconds(-10)}
              className="text-white hover:text-purple-400 transition-colors flex-shrink-0 hidden sm:block"
              title="Skip back 10s"
            >
              <FaStepBackward size={14} />
            </button>

            {/* Skip Forward */}
            <button
              onClick={() => skipSeconds(10)}
              className="text-white hover:text-purple-400 transition-colors flex-shrink-0 hidden sm:block"
              title="Skip forward 10s"
            >
              <FaStepForward size={14} />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={toggleMute}
                className="text-white hover:text-purple-400 transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-12 sm:w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Subtitles */}
            {subtitles.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowSubtitleMenu(!showSubtitleMenu)}
                  className={`transition-colors ${
                    selectedSubtitleIdx >= 0
                      ? "text-purple-400"
                      : "text-white hover:text-purple-400"
                  }`}
                  title="Subtitles"
                >
                  {selectedSubtitleIdx >= 0 ? (
                    <MdSubtitles size={20} />
                  ) : (
                    <MdClosedCaption size={20} />
                  )}
                </button>

                {/* Subtitle Dropdown */}
                {showSubtitleMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50 min-w-40">
                    {/* Off option */}
                    <button
                      onClick={handleToggleSubtitles}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        selectedSubtitleIdx === -1
                          ? "bg-purple-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      Off
                    </button>

                    {/* Subtitle options */}
                    {subtitles.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSubtitleSelect(idx)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors border-t border-gray-700 ${
                          selectedSubtitleIdx === idx
                            ? "bg-purple-600 text-white"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        {sub.lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-purple-400 transition-colors flex-shrink-0"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
