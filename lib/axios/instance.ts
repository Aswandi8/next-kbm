import axios from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
  Expires: 0,
};

const instance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error)
);
instance.interceptors.request.use(
  (respons) => respons,
  (error) => Promise.reject(error)
);
export default instance;
