import { useEffect, useMemo, useRef } from "react";
import * as echarts from "echarts";
import { getOption } from "./utils";
import { Forecasts } from "../../type";

interface IProps {
  data: Forecasts[] | undefined;
}

export const WeatherChart = (props: IProps) => {
  const { data } = props;
  const chartRef: any = useRef(null);

  const casts = useMemo(() => {
    // 目前可能根据adcode会有多个地方 现在取第一个展示
    return data?.[0]?.casts || [];
  }, [data]);

  const options = useMemo(() => {
    return getOption(casts);
  }, [casts]);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    chart.setOption(options);
  }, [options]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: 300,
      }}
    ></div>
  );
};
