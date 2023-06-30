import { AxiosRequestConfig } from "axios";
import { get } from "./server";

interface SearchWeatherParams extends AxiosRequestConfig {
  city: number;
  extensions: string;
}

export const searchWeather = (query: SearchWeatherParams) => {
  return get("/api/weatherSearch", { ...query });
};
