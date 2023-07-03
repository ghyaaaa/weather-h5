// 组装echarts的options

import * as dayjs from "dayjs";
import { Casts } from "../../type";
import { todayTimeState } from "../../utils";
import { weeks, weatherImage } from "../../constants";
import { keyBy } from "lodash-es";

export const getOption = (data: Casts[]) => {
  const timeState = todayTimeState();

  const dateList = data.map((item) => {
    return dayjs(item.date).format("D/M");
  });

  const weekList = data.map((item) => {
    return `星期${weeks.get(item.week)}`;
  });

  const weatherList = data.map((item) => {
    return item.dayweather;
  });

  const weatherRichList = data.map((item, i) => {
    const weather = timeState === 1 ? item.dayweather : item.nightweather;
    const imgUrl = weatherImage.get(weather);

    return {
      idx: i,
      backgroundColor: { image: imgUrl },
      height: 40,
      width: 40,
    };
  });

  const richWeather = Object.assign(keyBy(weatherRichList, "idx"), {
    b: {
      // color: 'white',
      fontSize: 12,
      lineHeight: 30,
      height: 20,
    },
  });

  const maxTempList = data.map((item) => item.daytemp);
  const minTempList = data.map((item) => item.nighttemp);

  const xAxis = [
    {
      type: "category",
      boundaryGap: false,
      position: "top",
      offset: 130,
      zlevel: 100,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        formatter: ["{a|{value}}"].join("\n"),
        rich: {
          a: {
            color: "white",
            fontSize: 18,
          },
        },
      },
      data: dateList,
    },
    {
      type: "category",
      boundaryGap: false,
      position: "top",
      offset: 110,
      zlevel: 100,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        formatter: ["{a|{value}}"].join("\n"),
        rich: {
          a: {
            color: "white",
            fontSize: 14,
          },
        },
      },
      nameTextStyle: {
        fontWeight: "bold",
        fontSize: 19,
      },
      data: weekList,
    },
    {
      type: "category",
      boundaryGap: false,
      position: "top",
      offset: 20,
      zlevel: 100,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        formatter: function (value: string, index: string) {
          return "{" + index + "| }\n{b|" + value + "}";
        },
        color: "white",
        rich: richWeather,
      },
      nameTextStyle: {
        // fontWeight: "bold",
        fontSize: 18,
      },
      data: weatherList,
    },
  ];

  const yAxis = {
    type: "value",
    show: false,
    axisLabel: {
      formatter: "{value}°",
      color: "white",
    },
  };

  const series = [
    {
      name: "最高气温",
      type: "line",
      data: maxTempList,
      showSymbol: true,
      smooth: true,
      itemStyle: {
        normal: {
          color: "#C95843",
        },
      },
      label: {
        show: true,
        position: "top",
        color: "white",
        formatter: "{c}°",
      },
      areaStyle: {
        opacity: 1,
        color: "transparent",
      },
    },
    {
      name: "最低气温",
      type: "line",
      data: minTempList,
      showSymbol: true,
      smooth: true,
      itemStyle: {
        normal: {
          color: "blue",
        },
      },
      label: {
        show: true,
        position: "bottom",
        color: "white",
        formatter: "{c}°",
      },
      areaStyle: {
        opacity: 1,
        color: "transparent",
      },
    },
  ];

  const option = {
    grid: {
      show: true,
      backgroundColor: "transparent",
      opacity: 0.3,
      borderWidth: "0",
      top: "180",
      bottom: "0",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      show: false,
    },
    xAxis,
    yAxis,
    series,
  };

  return option;
};
