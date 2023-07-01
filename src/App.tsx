import { Header, WeatherBody, WeatherDay, WeatherChart } from "./component";
import Style from "./App.module.less";
import { useState, useMemo } from "react";
import * as dayjs from "dayjs";
import * as isToday from "dayjs/plugin/isToday";
import { Forecasts, Weather } from "./type";

dayjs.extend(isToday);

function App() {
  const [forecastData, setForecastData] = useState<Forecasts[]>();

  const getWeatherData = (data: Weather) => {
    console.log(data);
    setForecastData(data.forecasts);
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

  return (
    <div className={Style.layout}>
      <Header getWeatherData={getWeatherData} />
      <WeatherBody data={todayWeatherData} />
      <WeatherDay data={forecastData} />
      <WeatherChart data={forecastData} />
    </div>
  );
}

export default App;
