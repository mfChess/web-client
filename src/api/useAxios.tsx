import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [loading, setLoading] = useState(axiosParams.method === "GET" || axiosParams.method === "get");

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result = await axios.request(params);
      setResponse(result);
    } catch( error ) {
      console.error("Axios request failed. ", error)
    } finally {
      setLoading(false);
    }
  };

  const sendData = () => {
    fetchData(axiosParams);
  }

  useEffect(() => {
    if(axiosParams.method === "GET" || axiosParams.method === "get"){
      fetchData(axiosParams);
    }
  },[]);

  return { response, loading, sendData };
}

export default useAxios;
