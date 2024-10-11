import axios, { InternalAxiosRequestConfig } from "axios";
import { cookies } from 'next/headers';

const addTokenInterceptor = (req: InternalAxiosRequestConfig) => {
  const token = cookies().get('access_token')?.value;
  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`;
  }

  return req;
}

// api principal - BASE_URL 
const httpServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
httpServer.interceptors.request.use(addTokenInterceptor);

export default httpServer;
