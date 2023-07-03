import { useMemo } from "react";
import { Casts } from "../../type";
import * as dayjs from "dayjs";
import * as isToday from "dayjs/plugin/isToday";
import { weatherImage, weeks } from "../../constants";
import Style from "./WeatherDayItem.module.less";
import { todayTimeState } from "../../utils";

dayjs.extend(isToday);

interface IProps {
  data: Casts;
}

export const WeatherDayItem = (props: IProps) => {
  const { data } = props;

  const isTodayText = useMemo(() => {
    return dayjs(data.date).isToday() ? "今天" : `星期${weeks.get(data.week)}`;
  }, [data]);

  const dayDate = useMemo(() => {
    return dayjs(data.date).format("D/M");
  }, [data]);

  const dayTempText = useMemo(() => {
    return `${data.daytemp}/${data.nighttemp}℃`;
  }, [data]);

  // 获取天气图片
  const getWeatherImg = useMemo(() => {
    return weatherImage.get(data.dayweather);
  }, [data]);

  return (
    <div>
      <p className={Style.dayText}>{isTodayText}</p>
      <p className={Style.dayDateText}>{dayDate}</p>
      <img className={Style.img} src={getWeatherImg} alt=""></img>
      <p className={Style.dayTemp}>{dayTempText}</p>
    </div>
  );
};
