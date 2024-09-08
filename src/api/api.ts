import axios, { AxiosRequestConfig, AxiosResponse, AxiosHeaders, CancelTokenSource, AxiosError} from 'axios';
import { getToken } from '../utils/token-util';
import Toast from 'react-native-toast-message';
import * as RootNavigation from '../utils/navigation-util';
import { Routes } from '../constants/router-constant';
import { ENVIRONMENT } from '../env/AppInfo';
import { ENV } from '../constants/system';

interface InternalAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosHeaders;
}

let config

if(ENVIRONMENT == ENV.DEV) {
  config = require("../env/config.dev").default
} else {
  config = require("../env/config.prod").default
}

const api = axios.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
});

// 添加请求拦截器
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    try {
      const token = await getToken()
      config.headers.setAuthorization(token)
      return config;
    } catch (error) {
      return Promise.reject(error)
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    const status= response.status;
    const data = response.data as ResInfo
    if(status === 200) { 
      if(data.code === 401) {
        Toast.show({
          type: 'normal',
          text1: '登录失败',
          text2: data.message,
          autoHide: false
        })
      }

      if(data.code === 500) {
        Toast.show({
          type: 'normal',
          text1: '操作失败',
          text2: data.message,
          autoHide: false
        })
      }

      if(data.code === 403) {
        RootNavigation.navigate(Routes.LOGIN)
      }
    }
    return response;
  },
  (error) => {
    if (error instanceof AxiosError && error.message === 'Network Error') {
        Toast.show({
          type: 'normal',
          text1: '操作失败',
          text2: '服务器正忙，请稍后重试',
          autoHide: false
        })
        return
    }
    return Promise.reject(error);
  }
);

export default api;