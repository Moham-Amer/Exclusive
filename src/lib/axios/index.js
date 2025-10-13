import axios from "axios";

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});



httpClient.interceptors.request.use(
  config => {

        config.headers["Authorization"] = "bearer " +localStorage.getItem("access_token");
        console.log(config.headers["Authorization"]);
    return config;
  },
  error => {
    Promise.reject(error);
  }
);