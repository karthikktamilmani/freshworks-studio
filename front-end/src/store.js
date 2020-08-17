import api from "./api";

export async function fetchFeeds() {
  const result = await api.get("/feed");
  return result.data.data || [];
}

export async function saveFeed(data) {
  const result = await api.post("/feed", data);
  return result.data.data || [];
}

export async function getSuggestions(data) {
  const result = await api.get("/suggestions", data);
  return result.data || [];
}
