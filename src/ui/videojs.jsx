// import React, { useEffect, useRef, useState } from 'react';
// import { Settings, Subtitles, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

// export const VideoPlayer = ({videoData}) => {
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);
//   const hlsRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showSubtitleMenu, setShowSubtitleMenu] = useState(false);
//   const [showSettingsMenu, setShowSettingsMenu] = useState(false);
//   const [selectedSubtitle, setSelectedSubtitle] = useState(null);
//   const [availableQualities, setAvailableQualities] = useState([]);
//   const [currentQuality, setCurrentQuality] = useState(-1);
//   const [m3u8Url, setM3u8Url] = useState(videoData.sources[0].url);

//   useEffect(() => {
//     const loadHls = async () => {
//       if (!window.Hls) {
//         const script = document.createElement('script');
//         script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js';
//         script.async = true;
//         document.body.appendChild(script);
        
//         await new Promise((resolve) => {
//           script.onload = resolve;
//         });
//       }
//     };

//     loadHls();

//     return () => {
//       if (hlsRef.current) {
//         hlsRef.current.destroy();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video || !m3u8Url) return;

//     setError(null);
//     setIsLoading(true);

//     if (window.Hls && window.Hls.isSupported()) {
//       if (hlsRef.current) {
//         hlsRef.current.destroy();
//       }

//       const hls = new window.Hls({
//         enableWorker: true,
//         lowLatencyMode: true,
//       });

//       hlsRef.current = hls;

//       // Use proxied URL if needed
//       const urlToLoad = getProxiedUrl(m3u8Url);
//       hls.loadSource(urlToLoad);
//       hls.attachMedia(video);

//       hls.on(window.Hls.Events.MANIFEST_PARSED, (event, data) => {
//         setIsLoading(false);
//         const levels = data.levels.map((level, index) => ({
//           index,
//           height: level.height,
//           bitrate: level.bitrate,
//           label: `${level.height}p`
//         }));
//         setAvailableQualities(levels);
//         setCurrentQuality(-1); // Auto
//       });

//       hls.on(window.Hls.Events.ERROR, (event, data) => {
//         console.error('HLS Error:', data);
//         // if (data.fatal) {
//         //   setIsLoading(false);
//         //   switch (data.type) {
//         //     case window.Hls.ErrorTypes.NETWORK_ERROR:
//         //       if (data.details === 'manifestLoadError' || data.response?.code === 0) {
//         //         setError('CORS Error: This video URL doesn\'t allow cross-origin requests.');
//         //       } else {
//         //         setError('Network error - Failed to load video.');
//         //       }
//         //       break;
//         //     case window.Hls.ErrorTypes.MEDIA_ERROR:
//         //       setError('Media error - Failed to play video format');
//         //       hls.recoverMediaError();
//         //       break;
//         //     default:
//         //       setError('Fatal error - Cannot play this video');
//         //       hls.destroy();
//         //       break;
//         //   }
//         // }
//       });
//     } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//       video.src = m3u8Url;
//       video.addEventListener('loadedmetadata', () => {
//         setIsLoading(false);
//       });
//     } else {
//       setError('HLS is not supported in this browser');
//       setIsLoading(false);
//     }

//     return () => {
//       if (hlsRef.current) {
//         hlsRef.current.destroy();
//         hlsRef.current = null;
//       }
//     };
//   }, [m3u8Url]);
//   // Load default subtitle (first English subtitle)
//   useEffect(() => {
//     if (videoData.subtitles && videoData.subtitles.length > 0) {
//       const englishSubtitle = videoData.subtitles.find(sub => sub.lang === 'English');
//       if (englishSubtitle) {
//         setSelectedSubtitle(englishSubtitle);
//       }
//     }
//   }, [videoData.subtitles]);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const toggleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (videoRef.current) {
//       videoRef.current.volume = newVolume;
//       setIsMuted(newVolume === 0);
//     }
//   };

//   const handleTimeUpdate = () => {
//     if (videoRef.current) {
//       setCurrentTime(videoRef.current.currentTime);
//     }
//   };

//   const handleLoadedMetadata = () => {
//     if (videoRef.current) {
//       setDuration(videoRef.current.duration);
//     }
//   };

//   const handleSeek = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setCurrentTime(newTime);
//     if (videoRef.current) {
//       videoRef.current.currentTime = newTime;
//     }
//   };

//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       playerRef.current?.requestFullscreen();
//       setIsFullscreen(true);
//     } else {
//       document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   };

//   const handleSubtitleSelect = (subtitle) => {
//     setSelectedSubtitle(subtitle);
//     setShowSubtitleMenu(false);
//   };
//   const handleQualitySelect = (qualityIndex) => {
//     if (hlsRef.current) {
//       hlsRef.current.currentLevel = qualityIndex;
//       setCurrentQuality(qualityIndex);
//       setShowSettingsMenu(false);
//     }
//   };
//   const formatTime = (time) => {
//     if (isNaN(time)) return '0:00';
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const loadVideo = () => {
//     if (m3u8Url.trim()) {
//       setError(null);
//     }
//   };

//   const getProxiedUrl = (url) => {
//     // Try different CORS proxies for Cloudflare-protected URLs
    
//     // Option 1: AllOrigins (usually works with Cloudflare)
//     // return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    
//     // Option 2: CORS Proxy (if Option 1 fails, uncomment this)
//     // return `https://corsproxy.io/?${encodeURIComponent(url)}`;
    
//     // Option 3: Your backend proxy (if using local server)
//     // return `https://localhost:3000/api/video-proxy?url=${encodeURIComponent(url)}`;
    
//     // Option 4: Direct URL (if no CORS issues)
//     // return url;
//     const isDevelopment = import.meta.env.DEV;
  
//   // if (isDevelopment) {
//   //   // Use relative path for development (will be proxied by Vite)
//   //   return `http://localhost:3000/api/video-proxy?url=${encodeURIComponent(url)}`;
//   // } else {
//   //   // Use absolute path for production
//   //   return `https://nepavshek.onrender.com/api/video-proxy?url=${encodeURIComponent(url)}`;
//   // }
//   return url;
//   };

//   return (
//     <div className="">
//       <div className="">
//         <div
//           ref={playerRef}
//           className="relative bg-black rounded-lg overflow-hidden shadow-2xl"
//         >
//           <video
//             ref={videoRef}
//             className="w-full aspect-video"
//             onTimeUpdate={handleTimeUpdate}
//             onLoadedMetadata={handleLoadedMetadata}
//             onPlay={() => setIsPlaying(true)}
//             onPause={() => setIsPlaying(false)}
//           >
//             {selectedSubtitle && selectedSubtitle.lang !== 'thumbnails' && (
//               <track
//                 kind="subtitles"
//                 src={selectedSubtitle.url}
//                 srcLang={selectedSubtitle.lang.toLowerCase()}
//                 label={selectedSubtitle.lang}
//                 default
//           />
//             )}
//           </video>

//           {isLoading && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
//               <div className="text-white text-lg">Loading video...</div>
//             </div>
//           )}

//           {error && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
//               <div className="text-red-400 text-lg text-center px-4">{error}</div>
//             </div>
//           )}

//           {m3u8Url && !isLoading && !error && (
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
//               <div className="mb-3">
//                 <input
//                   type="range"
//                   min="0"
//                   max={duration || 0}
//                   value={currentTime}
//                   onChange={handleSeek}
//                   className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
//                   style={{
//                     background: `linear-gradient(to right, #9333ea 0%, #9333ea ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`
//                   }}
//                 />
//                 <div className="flex justify-between text-white text-sm mt-1">
//                   <span>{formatTime(currentTime)}</span>
//                   <span>{formatTime(duration)}</span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={togglePlay}
//                   className="text-white hover:text-purple-400 transition-colors"
//                 >
//                   {isPlaying ? <Pause size={24} /> : <Play size={24} />}
//                 </button>

//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={toggleMute}
//                     className="text-white hover:text-purple-400 transition-colors"
//                   >
//                     {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
//                   </button>
//                   <input
//                     type="range"
//                     min="0"
//                     max="1"
//                     step="0.01"
//                     value={isMuted ? 0 : volume}
//                     onChange={handleVolumeChange}
//                     className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
//                   />
//                 </div>

//                 <div className="ml-auto flex items-center gap-2">
//                   {/* Subtitle Menu */}
//                   <div className="relative">
//                     <button
//                       onClick={() => {
//                         setShowSubtitleMenu(!showSubtitleMenu);
//                         setShowSettingsMenu(false);
//                       }}
//                       className="text-white hover:text-purple-400 transition-colors"
//                     >
//                       <Subtitles size={24} />
//                     </button>
//                     {showSubtitleMenu && (
//                       <div className="absolute bottom-full mb-2 right-0 bg-gray-800 rounded-lg shadow-lg p-2 min-w-[150px]">
//                         <div className="text-white text-sm font-semibold mb-2 px-2">Subtitles</div>
//                         <button
//                           onClick={() => handleSubtitleSelect(null)}
//                           className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
//                             selectedSubtitle === null
//                               ? 'bg-purple-600 text-white'
//                               : 'text-gray-300 hover:bg-gray-700'
//                           }`}
//                         >
//                           Off
//                         </button>
//                         {videoData.subtitles
//                           .filter(sub => sub.lang !== 'thumbnails')
//                           .map((subtitle, index) => (
//                             <button
//                               key={index}
//                               onClick={() => handleSubtitleSelect(subtitle)}
//                               className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
//                                 selectedSubtitle?.url === subtitle.url
//                                   ? 'bg-purple-600 text-white'
//                                   : 'text-gray-300 hover:bg-gray-700'
//                               }`}
//                             >
//                               {subtitle.lang}
//                             </button>
//                           ))}
//                       </div>
//                     )}
//                   </div>
//                   {/* Settings Menu */}
//                   <div className="relative">
//                     <button
//                       onClick={() => {
//                         setShowSettingsMenu(!showSettingsMenu);
//                         setShowSubtitleMenu(false);
//                       }}
//                       className="text-white hover:text-purple-400 transition-colors"
//                     >
//                       <Settings size={24} />
//                     </button>
//                     {showSettingsMenu && (
//                       <div className="absolute bottom-full mb-2 right-0 bg-gray-800 rounded-lg shadow-lg p-2 min-w-[150px]">
//                         <div className="text-white text-sm font-semibold mb-2 px-2">Quality</div>
//                         <button
//                           onClick={() => handleQualitySelect(-1)}
//                           className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
//                             currentQuality === -1
//                               ? 'bg-purple-600 text-white'
//                               : 'text-gray-300 hover:bg-gray-700'
//                           }`}
//                         >
//                           Auto
//                         </button>
//                         {availableQualities.map((quality) => (
//                           <button
//                             key={quality.index}
//                             onClick={() => handleQualitySelect(quality.index)}
//                             className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
//                               currentQuality === quality.index
//                                 ? 'bg-purple-600 text-white'
//                                 : 'text-gray-300 hover:bg-gray-700'
//                             }`}
//                           >
//                             {quality.label}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                   <button
//                     onClick={toggleFullscreen}
//                     className="text-white hover:text-purple-400 transition-colors"
//                   >
//                     {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;