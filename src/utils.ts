import * as dayjs from "dayjs";
import { DateState } from "./type";
// 早上 1 晚上 2

export const todayTimeState: () => DateState = () => {
  const hour = dayjs().hour();

  if (hour < 18) {
    return 1;
  } else {
    return 2;
  }
};
