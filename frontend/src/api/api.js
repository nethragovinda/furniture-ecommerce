import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Update to your backend URL if deployed
});

// Add the token to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
