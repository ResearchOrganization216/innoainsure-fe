import axios, { AxiosError } from "axios";

const axiosEstimationInstance = axios.create({
  //baseURL: `${import.meta.env.VITE_API_URL}/api`,
  baseURL: `http://34.142.153.194:5003/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosEstimationInstance.interceptors.response.use(
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

const axiosCustomerRiskInstance = axios.create({
  //baseURL: `${import.meta.env.VITE_API_URL}/api`,
  baseURL: `http://34.142.153.194:5003/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosCustomerRiskInstance.interceptors.response.use(
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

const axiosVehicleRiskInstance = axios.create({
  //baseURL: `${import.meta.env.VITE_API_URL}/api`,
  baseURL: `http://34.142.153.194:5003/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosVehicleRiskInstance.interceptors.response.use(
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

const axiosFraudRiskInstance = axios.create({
  //baseURL: `${import.meta.env.VITE_API_URL}/api`,
  baseURL: `http://34.142.153.194:5003/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosFraudRiskInstance.interceptors.response.use(
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

const axiosDocumentRiskInstance = axios.create({
  //baseURL: `${import.meta.env.VITE_API_URL}/api`,
  baseURL: `http://34.142.153.194:5003/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosDocumentRiskInstance.interceptors.response.use(
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

export {
  axiosCustomerRiskInstance,
  axiosDocumentRiskInstance,
  axiosEstimationInstance,
  axiosFraudRiskInstance,
  axiosVehicleRiskInstance,
};
