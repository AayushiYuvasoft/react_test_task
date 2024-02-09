import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 400:
          toast.error("please fill all the details", response.data);

          console.error("Bad Request Error:", response.data);
          break;
        case 401:
          toast.error("Unauthorized Error:", response.data);

          console.error("Unauthorized Error:", response.data);
          break;
        case 404:
          toast.error("Unauthorized Error:", response.data);

          console.error("Not Found Error:", response.data);
          toast.error("Not Found Error:", response.data);

          break;
        default:
          toast.error("API Error:", error);

          console.error("API Error:", error);
      }
    } else {
      console.error("Network Error:", error);
    }
    return Promise.reject(error);
  }
);

const loginApi = axios.create({
  baseURL: "http://localhost:8000/",
});

loginApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          if (data.errors && data.errors.length > 0) {
            data.errors.forEach((error) => {
              toast.error(error.message);
            });
          } else {
            toast.error(data.message || "Bad Request Error");
          }
          break;
        case 401:
          toast.error("Unauthorized Error");
          break;
        case 404:
          toast.error("Not Found Error");
          break;
        default:
          toast.error("API Error");
      }
    } else {
      // Network error
      toast.error("Network Error");
    }
    return Promise.reject(error);
  }
);

const signupApi = axios.create({
  baseURL: "http://localhost:8000/",
});
export { api, loginApi, signupApi };
