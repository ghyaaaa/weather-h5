import { useEffect, useState } from "react";
import { SearchBar } from "antd-mobile";
import { EnvironmentOutline } from "antd-mobile-icons";
import { City, Weather } from "../../type";
import { getIP, searchWeather } from "../../api/apis";
import Style from "./Header.module.less";

interface IProps {
  getWeatherData: (data: Weather) => void;
}

export const Header = (props: IProps) => {
  const { getWeatherData } = props;

  const [city, setCity] = useState<City>();

  const getGeoIP = async () => {
    const res = await getIP();

    setCity(JSON.parse(res.data));
  };

  const getWeather = async (params: { city: string; extensions: string }) => {
    const res = await searchWeather(params);

    getWeatherData(JSON.parse(res.data));
  };

  useEffect(() => {
    getGeoIP();
  }, []);

  useEffect(() => {
    if (city) {
      getWeather({
        city: city.adcode,
        extensions: "all",
      });
    }
  }, [city]);

  return (
    <div className={Style.layout}>
      {/* 定位 */}
      <div className={Style.city}>
        <EnvironmentOutline />
        {city?.city}
      </div>
      <SearchBar placeholder="请输入内容" />
    </div>
  );
};
