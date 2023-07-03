import { Header, WeatherBody, WeatherDay, WeatherChart } from "./component";
import { useState, useMemo, useEffect } from "react";
import * as dayjs from "dayjs";
import * as isToday from "dayjs/plugin/isToday";
import { City, District, Forecasts, Weather } from "./type";
import { getAdCode, getIP, searchWeather } from "./api/apis";
import { Toast, SpinLoading, SafeArea } from "antd-mobile";
import Style from "./App.module.less";

dayjs.extend(isToday);

function App() {
  const [forecastData, setForecastData] = useState<Forecasts[]>();
  const [city, setCity] = useState<{ name: string; adcode: string }>();
  const [loading, setLoading] = useState(true);

  const getGeoIP = async () => {
    const res = await getIP();
    const data: City = JSON.parse(res.data);
    setCity({
      name: data.city,
      adcode: data.adcode,
    });
  };

  const getWeatherData = (data: Weather) => {
    setForecastData(data.forecasts);
  };

  const getWeather = async (params: { city: string; extensions: string }) => {
    if (loading) {
      setLoading(true);
    }
    const res = await searchWeather(params).finally(() => {
      setLoading(false);
    });

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

  // 获取当天天气情况
  const todayWeatherData = useMemo(() => {
    const firstForecast = forecastData?.[0];
    const reporttime = firstForecast?.reporttime;
    const castsItem: any = (forecastData?.[0].casts || []).find((item) =>
      dayjs(item.date).isToday()
    );
    return {
      ...castsItem,
      reporttime,
    };
  }, [forecastData]);

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
    <div>
      <div style={{ background: "#ace0ff" }}>
        <SafeArea position="top" />
      </div>
      <div className={Style.main}>
        <div
          className={Style.layout}
          style={{
            backgroundImage: `url("https://i.i8tq.com/e_index/n01.png?2013")`,
          }}
        >
          {loading ? (
            <div className={Style.loading}>
              <SpinLoading color="primary" />
            </div>
          ) : (
            <>
              <Header city={city} getCityAdCode={getCityAdCode} />
              <WeatherBody data={todayWeatherData} />
              <WeatherDay data={forecastData} />
              <WeatherChart data={forecastData} />
            </>
          )}
        </div>
      </div>
      <div style={{ background: "#ace0ff" }}>
        <SafeArea position="bottom" />
      </div>
    </div>
  );
}

export default App;
