import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  //baseURL: `${import.meta.env.VITE_API_URL}/api`,
  baseURL: `http://35.247.173.214/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.error("Response Interceptor: Error", error); // Logging
    // Only redirect if the request is not for the login endpoint
    if (
      error.response?.status === 401 &&
      (error as any).config.url !== "/auth/login"
    ) {
      console.log("Unauthorized, redirecting to sign-in page"); // Logging
      if (!window.location.href.toString().includes("/auth/sign-in")) {
        window.location.href = "/auth/sign-in";
      }
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
