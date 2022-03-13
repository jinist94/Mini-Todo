import React from "react";

const DueDateText = ({ dueDate }) => {
  const sYear = dueDate.substring(0, 4);
  const sMonth = dueDate.substring(5, 7);
  const sDate = dueDate.substring(8, 10);
  const nDate = new Date(sYear, Number(sMonth) - 1, sDate);
  let today = new Date();
  const tYear = today.getFullYear();
  const tMonth = today.getMonth();
  const tDate = today.getDate();
  const thisYear = nDate.getFullYear();
  const thisMonth = nDate.getMonth();
  const thisDate = nDate.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const thisDay = week[nDate.getDay()];

  // 시,분,초 초기화
  const date = new Date(thisYear, thisMonth, thisDate);
  today = new Date(tYear, tMonth, tDate);
  const tomorrow = new Date(tYear, tMonth, tDate + 1);

  let isOverdue = today > date ? "기한 초과, " : "";

  if (today.toString() === date.toString()) {
    return <span className="due-date__text today">오늘</span>;
  }
  if (tomorrow.toString() === date.toString()) {
    return <span className="due-date__text">내일</span>;
  }

  return (
    <>
      <span className={`${today > date ? "over-due" : ""} due-date__text`}>
        {`${isOverdue}${tYear !== thisYear ? thisYear + "년 " : ""}${
          thisMonth + 1
        }월 ${thisDate}일 (${thisDay})`}
      </span>
    </>
  );
};

export default React.memo(DueDateText);
