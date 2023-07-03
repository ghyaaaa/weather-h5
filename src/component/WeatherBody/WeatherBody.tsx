import * as dayjs from "dayjs";
import { useMemo } from "react";
import { weeks, weatherImage } from "../../constants";
import { Space } from "antd-mobile";
import { todayTimeState } from "../../utils";
import { Casts } from "../../type";
import Style from "./WeatherBody.module.less";

interface Item extends Casts {
  reporttime: string | undefined;
}
interface IProps {
  data: Item;
}

export const WeatherBody = (props: IProps) => {
  const { data } = props;

  // 获取周几信息
  const todayWeek = useMemo(() => {
    return `星期${weeks.get(data?.week || "")}`;
  }, [data]);

  // 今天几月几日
  const todayDate = useMemo(() => {
    return dayjs(data?.date).format("MM月DD日");
  }, [data]);

  // 今日信息
  const today = useMemo(() => {
    return `${todayDate}(${todayWeek})`;
  }, [todayDate, todayWeek]);

  // 获取天气更新时间
  const hourMinute = useMemo(() => {
    if (data?.reporttime) {
      return `${dayjs(data?.reporttime).format("H:mm")}更新`;
    }

    return `${dayjs().hour()}:${dayjs().minute()}更新`;
  }, [data]);

  // 白天和晚上的温度
  const temp = useMemo(() => {
    return `${data?.daytemp}℃/${data?.nighttemp}℃`;
  }, [data]);

  // 判断早上还是晚上
  const timeState = useMemo(() => {
    return todayTimeState();
  }, []);

  const showTemp = useMemo(() => {
    return timeState === 1 ? data?.daytemp : data?.nighttemp;
  }, [data, timeState]);

  // 获取早晚天气
  const dayWeather = useMemo(() => {
    return timeState === 1 ? data?.dayweather : data?.nightweather;
  }, [data, timeState]);

  // 获取天气图片
  const getWeatherImg = useMemo(() => {
    return weatherImage.get(dayWeather);
  }, [dayWeather]);

  const dayWind = useMemo(() => {
    return timeState === 1
      ? `${data?.daywind}风${data?.daypower}级`
      : `${data?.nightwind}风${data?.nightpower}级`;
  }, [data, timeState]);

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
          <h1>{showTemp}</h1>
        </div>
        <div className={Style.weatherIcon}>
          <span>℃</span>
          <img src={getWeatherImg}></img>
        </div>
        <div className={Style.focTemp}>
          <h2>{dayWeather}</h2>
          <p>{temp}</p>
        </div>
      </Space>
      <div>{dayWind}</div>
    </div>
  );
};
