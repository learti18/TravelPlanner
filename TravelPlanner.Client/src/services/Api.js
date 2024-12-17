import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5120/api/",
});

export default apiClient
