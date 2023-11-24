import axios from "axios";

const api = axios.create({
  baseURL: "https://api-gsolution-digital.azurewebsites.net/api",
});

export default api;
