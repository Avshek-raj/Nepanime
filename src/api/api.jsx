import axios from "axios";

export const api = axios.create({
  baseURL: "https://nepanime.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAnime = async (parameter) => {
    const response = await api.get(parameter);
    return response;
}   