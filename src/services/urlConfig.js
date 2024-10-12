import axios from "axios";
import { userLocal } from "./localService";
import { store } from "../redux/store";
import { turnOffLoading, turnOnLoading } from "../redux/loading/loadingSlice";

const headersCustom = {
  tokenCybersoft:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NyIsIkhldEhhblN0cmluZyI6IjI3LzEyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczNTI1NzYwMDAwMCIsIm5iZiI6MTcwNTU5NzIwMCwiZXhwIjoxNzM1NDA1MjAwfQ.QgJv8DfQ6VrgNKpb6y5aTzwXLElPfrxzaooDqmw06CY",
  token: userLocal.get()?.token,
};

export const https = axios.create({
  headers: headersCustom,
  baseURL: "https://fiverrnew.cybersoft.edu.vn",
});

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    store.dispatch(turnOnLoading());
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    setTimeout(() => {
      store.dispatch(turnOffLoading());
    }, 300);

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    setTimeout(() => {
      store.dispatch(turnOffLoading());
    }, 300);

    return Promise.reject(error);
  }
);
