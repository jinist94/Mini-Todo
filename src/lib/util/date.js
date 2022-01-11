export const dateToString = (date) => {
  const today = new Date();
  const getMonth = date.getMonth();
  const getDate = date.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const getDay = week[date.getDay()];

  return `${getMonth + 1}월 ${getDate}일 (${getDay})`;
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
