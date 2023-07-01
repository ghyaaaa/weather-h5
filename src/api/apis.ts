import { AxiosRequestConfig } from "axios";
import { get } from "./server";

interface SearchWeatherParams extends AxiosRequestConfig {
  city: string;
  extensions: string;
}

interface GetAdCode extends AxiosRequestConfig {
  keywords: string;
  subdistrict: number;
}

export const searchWeather = (query: SearchWeatherParams) => {
  return get("/api/weatherSearch", query);
};

export const getIP = () => {
  return get("/api/getIP");
};

export const getAdCode = (query: GetAdCode) => {
  return get("/api/getAdCode", query);
};
