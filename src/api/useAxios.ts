import axios from "axios";

export const BASE_URL = "https://pixsy-api.vercel.app/";

export const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  return axiosInstance;
};
