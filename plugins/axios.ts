import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const { privateKey, baseUrl } = config.public;

  const axiosInstanceJSON = axios.create({
    baseURL: baseUrl as string,
    headers: {
      "private-key": privateKey as string,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  axiosInstanceJSON.interceptors.request.use((request) => {
    request.headers["private-key"] = privateKey;
    return request;
  });
  axiosInstanceJSON.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // handled server error globally
      if (error.response.status === 500) {
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
