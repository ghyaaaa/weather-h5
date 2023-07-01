import { AxiosRequestConfig } from "axios";
import { get } from "./server";

interface SearchWeatherParams extends AxiosRequestConfig {
  city: string;
  extensions: string;
}

export const searchWeather = (query: SearchWeatherParams) => {
  return get("/api/weatherSearch", query);
};

export const getIP = () => {
  return get("/api/getIP");
};
