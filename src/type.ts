export interface City {
  adcode: string;
  city: string;
  info: string; // 返回状态说明
  infocode: string; // 状态码
  province: string; // 省份名称
  status: number; // 返回结果状态值
  rectangle: string; // 所在城市范围的左下右上对标对
}

export interface Casts {
  date: string;
  week: string;
  dayweather: string;
  nightweather: string;
  daytemp: string;
  nighttemp: string;
  daywind: string;
  nightwind: string;
  daypower: string;
  nightpower: string;
}

export interface Forecasts {
  province: string;
  city: string;
  adcode: string;
  reporttime: string; // 发布时间
  casts: Casts[];
}

export interface Weather {
  status: 0 | 1;
  count: number; // 返回结果总数目
  info: string; // 返回的状态信息
  lives: {
    province: string;
    city: string;
    adcode: string;
    weather: string; // 天气现象（汉字描述）
    temperature: string; // 实时气温，单位：摄氏度
    winddirection: string; // 风向描述
    windpower: string; // 风力级别，单位：级
    humidity: string; // 空气湿度
    reporttime: string; // 发布时间
  };
  forecasts: Forecasts[];
}

export type DateState = 1 | 2; // 1 早上 2 晚上

export interface District {
  status: 0 | 1;
  info: string;
  infocode: string;
  count: string;
  suggestion: {
    keywords: [];
    cites: [];
  }[];
  districts: {
    citycode: string;
    adcode: string;
    name: string;
    center: string;
    districts: [];
    level: string;
  }[];
}
