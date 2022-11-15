import axios from "axios";
import { getToken } from "./jwt";

if (typeof window !== "undefined") {
  var token = localStorage.getItem("Token");
}

const tokenLocal = JSON.stringify(token);

const request = axios.create({
  baseURL: "https://ak-tracuusaubenh.herokuapp.com",
});

request.interceptors.request.use((config) => {
  if (getToken() || token) {
    config.headers.Authorization = `Bearer ${getToken() || tokenLocal}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export const get = async (path, option = {}) => {
  const responese = await request.get(path, option);
  return responese.data;
};

export const post = async (path, option = {}) => {
  const responese = await request.post(path, option);
  return responese.data;
};

export const put = async (path, option = {}) => {
  const responese = await request.put(path, option);
  return responese.data;
};

export default request;
