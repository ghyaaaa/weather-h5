import { useEffect, useState, useRef } from "react";
import { SearchBar, Toast } from "antd-mobile";
import { EnvironmentOutline } from "antd-mobile-icons";
import { City, District, Weather } from "../../type";
import { getIP, searchWeather, getAdCode } from "../../api/apis";
import Style from "./Header.module.less";

interface IProps {
  getWeatherData: (data: Weather) => void;
}

export const Header = (props: IProps) => {
  const { getWeatherData } = props;

  const searchRef: any = useRef(null);

  const [city, setCity] = useState<{ name: string; adcode: string }>();

  const getGeoIP = async () => {
    const res = await getIP();
    const data: City = JSON.parse(res.data);
    setCity({
      name: data.city,
      adcode: data.adcode,
    });
  };

  const getWeather = async (params: { city: string; extensions: string }) => {
    const res = await searchWeather(params);

    getWeatherData(JSON.parse(res.data));
  };

  const getCityAdCode = async (params: {
    keywords: string;
    subdistrict: number;
  }) => {
    const res = await getAdCode(params);
    const district: District = JSON.parse(res.data);

    if (Number(district.count)) {
      const firstDistrictsItem = district.districts[0];

      setCity({
        name: firstDistrictsItem.name,
        adcode: firstDistrictsItem.adcode,
      });
    } else {
      Toast.show({
        icon: "fail",
        content: "请输入正确的城市名字",
      });
    }
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

  const onSearch = (value: string) => {
    if (!value) return;
    getCityAdCode({
      keywords: value,
      subdistrict: 0,
    });

    searchRef.current.clear();
    searchRef.current.focus();
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
    onSearch(value);
  };

  return (
    <div className={Style.layout}>
      {/* 定位 */}
      <div className={Style.city}>
        <EnvironmentOutline />
        {city?.name}
      </div>
      <SearchBar
        ref={searchRef}
        placeholder="请输入中文，支持中国城市"
        onBlur={onBlur}
        onSearch={onSearch}
      />
    </div>
  );
};
