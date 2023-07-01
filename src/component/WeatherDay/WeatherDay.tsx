import { useMemo } from "react";
import { WeatherDayItem } from "../WeatherDayItem";
import { Forecasts } from "../../type";
import { JumboTabs } from "antd-mobile";
import Style from "./WeatherDay.module.less";

interface IProps {
  data: Forecasts[] | undefined;
}

export const WeatherDay = (props: IProps) => {
  const { data } = props;

  const casts = useMemo(() => {
    // 目前可能根据adcode会有多个地方 现在取第一个展示
    return data?.[0]?.casts || [];
  }, [data]);

  return (
    <JumboTabs className={Style.wrapper}>
      {casts.map((item) => (
        <JumboTabs.Tab
          key={item.date}
          title={<WeatherDayItem data={item} />}
          description=""
        ></JumboTabs.Tab>
      ))}
    </JumboTabs>
  );
};
