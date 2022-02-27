export const dateToString = (date) => {
  const getMonth = date.getMonth();
  const getDate = date.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const getDay = week[date.getDay()];

  return `${getMonth + 1}월 ${getDate}일 (${getDay})`;
};

export const dateForData = (date) => {
  console.log(date, "dateForData");
  const getYear = date.getFullYear();
  const getMonth = date.getMonth() + 1;
  const getDate = date.getDate();
  const getHour = date.getHours();
  const getMinutes = date.getMinutes();
  const getSeconds = date.getSeconds();

  return `${getYear}-${getMonth < 10 ? "0" + getMonth : getMonth}-${
    getDate < 10 ? "0" + getDate : getDate
  } ${getHour < 10 ? "0" + getHour : getHour}:${
    getMinutes < 10 ? "0" + getMinutes : getMinutes
  }:${getSeconds < 10 ? "0" + getSeconds : getSeconds}`;
};

export const dataToDate = (date) => {
  const sYear = date.substring(0, 4);
  const sMonth = date.substring(5, 7);
  const sDate = date.substring(8, 10);

  const sHour = date.substring(11, 13);
  const sMinutes = date.substring(14, 16);
  const sSeconds = date.substring(17);

  return new Date(sYear, Number(sMonth) - 1, sDate, sHour, sMinutes, sSeconds);
};

export const dateConverder = (date) => {
  let today = new Date();
  const tYear = today.getFullYear();
  const tMonth = today.getMonth();
  const tDate = today.getDate();
  const thisYear = date.getFullYear();
  const thisMonth = date.getMonth();
  const thisDate = date.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const thisDay = week[date.getDay()];

  // 시,분,초 초기화
  date = new Date(thisYear, thisMonth, thisDate);
  today = new Date(tYear, tMonth, tDate);
  const tomorrow = new Date(tYear, tMonth, tDate + 1);

  if (today.toString() === date.toString()) {
    return "오늘";
  }

  if (tomorrow.toString() === date.toString()) {
    return "내일";
  }

  let islate = today > date ? "기한 초과, " : "";

  return `${islate}${tYear !== thisYear ? thisYear + "년 " : ""}${
    thisMonth + 1
  }월 ${thisDate}일 (${thisDay})`;
};
