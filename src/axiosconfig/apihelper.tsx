import axios from 'axios';
import {
    BASE_URL,
    DELETE_METHOD,
    GET_METHOD,
    POST_METHOD,
    PUT_METHOD,
    PATCH_METHOD
  } from '../constant/constants';
import { getData, storeData } from '../utils/storage';
import { jwtDecode } from 'jwt-decode';
import { LoginUserData } from '../screens/login/type';



  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: defaultHeaders,

  });

  //GET METHOD

  export async function getApi(
        reqPath: string,
        payload: any
    ) {
        const response = await axiosInstance.request({
        url: reqPath,
        method: GET_METHOD,
        params: payload,
        
        });
        return response;
    }

  //POST Method
    export const postApi = async (reqPath: string, payload: any) => {
      console.log(payload)
        const response = await axiosInstance.request({
        url: reqPath,
        method: POST_METHOD,
        data: payload,
        headers: {
            ...defaultHeaders
        }
        });
        return response;
    };

  //PUT Method
    export const putApi = async (reqPath:string, payload: any) => {
        const response = await axiosInstance.request({
        url: reqPath,
        method: PUT_METHOD,
        data: payload,
        headers: {
            ...defaultHeaders
        }
        });
        return response;
    };

//     //PATCH Method
export const patchApi = async (reqPath: string, payload: any) => {
    const response = await axiosInstance.request({
      url: reqPath,
      method: PATCH_METHOD,
      data: payload,
      headers: {
        ...defaultHeaders
      }
    });
    return response;
  };

//   //DELETE Method
    export const deleteApi = async (reqPath: string, payload: any) => {
        const response = await axiosInstance.request({
        url: reqPath,
        method: DELETE_METHOD,
        data: payload,
        headers: {
            ...defaultHeaders
        }
        });
        return response;
    };

  // adding the default query params required for all API's
    axiosInstance.interceptors.request.use(async (config: any) => {
      const token = await getData('token');
      const decoded: LoginUserData = jwtDecode(token??'');
      const jsonValue = JSON.stringify(decoded); 
      await storeData('user', jsonValue);
      const storedUserData = await getData('user');

        config.headers = {
        ...config.headers,
        Authorization: token
        };
        return config;
    });

    //interceptor for showing toast notifications on global level
    axiosInstance.interceptors.response.use(
    res => {
        // toast.success(res?.data?.msg);
        console.log("errorttttt",res);
        return res;
    },
    error => {
      //console.log("errorttttt",error);
        if (error?.response?.status === 401) {
       // localStorage.clear();
        }
        // toast.error(
        // `${error?.response?.data?.message}` || 'Oops, something went wrong!'
        // );
        return Promise.reject(error);
    }
    );