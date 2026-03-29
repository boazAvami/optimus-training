import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const AXIOS_INSTANCE = axios.create({
  baseURL: "http://localhost:3000", 
  headers: {
    "Content-Type": "application/json",
  },
});


export const customInstance = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse<T> = await AXIOS_INSTANCE.request<T>(config);
  return response.data; // ✅ unwrap .data
};