import * as dayjs from "dayjs";
import { useMemo } from "react";
import { weeks } from "../../constants";
import { Space } from "antd-mobile";
import Style from "./WeatherBody.module.less";

export const WeatherBody = () => {
  const todayWeek = useMemo(() => {
    const week = dayjs(new Date()).day();

    return `星期${weeks.get(week)}`;
  }, []);

  const todayDate = useMemo(() => {
    return dayjs(new Date()).format("MM月DD日");
  }, []);

  const today = useMemo(() => {
    return `${todayDate}(${todayWeek})`;
  }, [todayDate, todayWeek]);

  const hourMinute = useMemo(() => {
    return `${dayjs().hour()}:${dayjs().minute()}更新`;
  }, []);

  return (
    <div className={Style.layout}>
      <Space
        block
        align="end"
        direction="vertical"
        className={Style.dayateTime}
      >
        <div className={Style.weekDay}>{today}</div>
        <div className={Style.updateTime}>{hourMinute}</div>
      </Space>
      {/* 天气 */}
      <Space style={{ "--gap": "0px" }} className={Style.focWeather}>
        <div className={Style.weather}>
          <h1>24</h1>
        </div>
        <div className={Style.weatherIcon}>
          <span>℃</span>
          <img src="https://i.i8tq.com/e_index/todayweather/01_n.png"></img>
        </div>
        <div className={Style.focTemp}>
          <h2>多云</h2>
          <p>34℃/24℃</p>
        </div>
      </Space>
      <div>北风0级|湿度83%</div>
    </div>
  );
};
