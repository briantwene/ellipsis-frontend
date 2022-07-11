import axios from "axios";
import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

let headers = {};

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authData = await AsyncStorage.getItem("@AuthData");

    const parsed = JSON.parse(authData);
    if (parsed !== null) {
      config.headers = {
        Authorization: `Bearer ${parsed.token}`
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
