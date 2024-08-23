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
import Toast from 'react-native-simple-toast';




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
      try {
        const response = await axiosInstance.request({
          url: reqPath,
          method: GET_METHOD,
          params: payload,
        });
        return response;
      } catch (error: any) {
        console.error('GET API Error:', error?.response?.data || error.message);
        Toast.show('Something went wrong', Toast.LONG);   
        throw error; // Re-throw the error if you want to handle it later
      }
    }


  //POST Method
    export const postApi = async (reqPath: string, payload: any) => {
      try {
        const response = await axiosInstance.request({
        url: reqPath,
        method: POST_METHOD,
        data: payload,
        headers: {
            ...defaultHeaders
        }
        });
        return response;
      }  catch (error: any) {
       // console.error('Post API Error:', error?.response?.data || error.message);
        Toast.show(error.response.data.error_description || 'Something went wrong', Toast.LONG);
        throw error;
      }

    };

  //PUT Method
    export const putApi = async (reqPath:string, payload: any) => {
      try {
        const response = await axiosInstance.request({
          url: reqPath,
          method: PUT_METHOD,
          data: payload,
          headers: {
            ...defaultHeaders
          }
        });
        return response;
      } catch (error: any) {
        console.error('PUT API Error:', error?.response?.data || error.message);
        Toast.show(error.response.data.error_description || 'Something went wrong', Toast.LONG);
        throw error;
      }
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
      if(token){
      const decoded: LoginUserData = jwtDecode(token??'');
      const jsonValue = JSON.stringify(decoded); 
      await storeData('user', jsonValue);
      }
      
        config.headers = {
        ...config.headers,
        Authorization: token
        };
        return config;
    });

    //interceptor for showing toast notifications on global level
    axiosInstance.interceptors.response.use(
    res => {
        console.log("error",res);
        return res;
    },
    error => {
      console.log("error",error?.response?.status);
        if (error?.response?.status === 401) {
        }
        return Promise.reject(error);
    }
    );