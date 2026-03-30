import axios from "axios";

export const consumetHianimeApi = axios.create({
  // baseURL: "https://nepavshek.onrender.com/anime/zoro/",
  baseURL: "https://nepanime-anime.vercel.app/anime/animekai/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const hiAnimeApi = axios.create({
  // baseURL: "https://nepanime.onrender.com/api/v1",
  baseURL: "https://hianime-api-4ips.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const animekaiApi = axios.create({
  // baseURL: "https://nepavshek.onrender.com/anime/animekai/",
  baseURL: "https://nepanime-anime.vercel.app/anime/animekai/",
  headers: {
    "Content-Type": "application/json",
  },
});



export const fetchAnime = async (parameter, serverName) => {
  let response = {};
  try {
    switch (serverName) {
      case 'hianime':
        response = await hiAnimeApi.get(parameter);
        break;
      case 'animekai':
        response = await animekaiApi.get(parameter);
        break;
      default:
        response = await consumetHianimeApi.get(parameter);
        break;
    }
  } catch (err) {
    console.error("Error fetching anime data:", err);
  }
  return response;
}   