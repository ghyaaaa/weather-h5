import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
  Headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "application/json",
    "Accept-Language": "zh-cn",
  },
});

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      console.log("接口信息报错", res.message);
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("接口信息报错" + error);
    return Promise.reject(error);
  }
);

export function get(url: string, params?: Record<string, any>) {
  return service.get(url, {
    params,
  });
}
