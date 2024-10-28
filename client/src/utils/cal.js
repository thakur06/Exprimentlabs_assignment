import dayjs from "dayjs";

export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDay = dayjs(new Date(year, month, 1)).day();
  var currentMonth = 0 - firstDay;
  const matrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonth++;
      return new dayjs(new Date(year, month, currentMonth));
    });
  });
  return matrix;
};
