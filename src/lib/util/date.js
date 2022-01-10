export const dateToString = (date) => {
  const today = new Date();
  const getMonth = date.getMonth();
  const getDate = date.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const getDay = week[date.getDay()];

  return `${getMonth + 1}월 ${getDate}일 (${getDay})`;
};
