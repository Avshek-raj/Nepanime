import axios from "axios";

export const api = axios.create({
  baseURL: "https://nepanime.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const animeFetcher = async (parameter) => {
    const response = await api.get(parameter);
    return response.data;
}   