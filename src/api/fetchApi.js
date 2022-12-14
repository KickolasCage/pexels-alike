import axios from "axios";
import API_KEY from "./apiKey";

export const fetchApi = axios.create({
  baseURL: "https://api.pexels.com/v1/",
});

fetchApi.defaults.headers.common["Authorization"] = API_KEY;

export const fetchBackgroundImage = async (page) =>
  fetchApi.get("/search", {
    params: { size: "large2x", orientation: "landscape", query: "landscape" },
  });
