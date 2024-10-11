import axios, { InternalAxiosRequestConfig } from "axios";
import cookie from 'js-cookie';

const addTokenInterceptor = (req: InternalAxiosRequestConfig) => {
  const token = cookie.get('access_token');
  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`;
  }

  return req;
}

// Client principal - BASE_URL
const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

httpClient.interceptors.request.use(addTokenInterceptor);

export default httpClient;
