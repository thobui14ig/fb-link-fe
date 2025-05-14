import axios, { AxiosInstance } from 'axios';
import ApiConstant from './apiConstant';
import { getRefreshToken } from './auth.api';

class Http {
  instance: AxiosInstance;
  refreshToken = localStorage.getItem('refreshToken');

  constructor() {
    this.instance = axios.create({
      baseURL: ApiConstant.BASE_API_URL,
      timeout: 10000,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        refreshToken: this.refreshToken,
      },
    });
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        //lấy lại token khi hết hạn
        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem('refreshToken');

          try {
            const { data } = await getRefreshToken(refreshToken as string);
            localStorage.setItem('refreshToken', data.refresh_token);
            return axios(originalRequest);
          } catch (refreshError) {
            console.error('Lỗi khi làm mới access token:', refreshError);
          }
        }

        // khi refresh token cũng hết hạn
        if (error?.response?.status === 402 && !error?.response?.data?.refresh) {
          localStorage.clear();

          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
        }

        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;
export default http;
