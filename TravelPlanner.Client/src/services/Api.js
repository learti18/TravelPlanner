// src/api.js
import axios from "axios";

// Axios instance for v1 (search airports)
const apiClient = axios.create({
  baseURL: "http://localhost:5120/api/",
});

export default apiClient
