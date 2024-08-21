import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const { privateKey, baseUrl } = config.public;

  const axiosInstanceJSON = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      "private-key": privateKey,
      Accept: "application/json",
    },
  });

  axiosInstanceJSON.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 500) {
        alert("Something went wrong");
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axiosInstanceJSON,
    },
  };
});
