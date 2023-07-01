import { useMemo } from "react";
import { Casts } from "../../type";
import * as dayjs from "dayjs";
import * as isToday from "dayjs/plugin/isToday";
import { weeks } from "../../constants";
import Style from "./WeatherDayItem.module.less";

dayjs.extend(isToday);

interface IProps {
  data: Casts;
}

export const WeatherDayItem = (props: IProps) => {
  const { data } = props;

  const isTodayText = useMemo(() => {
    return dayjs(data.date).isToday()
      ? "今天"
      : `星期${weeks.get(Number(data.week))}`;
  }, [data]);

  const dayDate = useMemo(() => {
    return dayjs(data.date).format("D/M");
  }, [data]);

  const dayTempText = useMemo(() => {
    return `${data.daytemp}/${data.nighttemp}℃`;
  }, [data]);

  return (
    <div>
      <p className={Style.dayText}>{isTodayText}</p>
      <p className={Style.dayDateText}>{dayDate}</p>
      <img
        className={Style.img}
        src="https://i.i8tq.com/e_index/todayweather/01_d.png"
        alt=""
      ></img>
      <p className={Style.dayTemp}>{dayTempText}</p>
    </div>
  );
};
