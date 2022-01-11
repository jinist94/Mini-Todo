import React from "react";

const DueDateText = ({ dueDate }) => {
  let today = new Date();
  const tYear = today.getFullYear();
  const tMonth = today.getMonth();
  const tDate = today.getDate();
  const thisYear = dueDate.getFullYear();
  const thisMonth = dueDate.getMonth();
  const thisDate = dueDate.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const thisDay = week[dueDate.getDay()];

  // 시,분,초 초기화
  const date = new Date(thisYear, thisMonth, thisDate);
  today = new Date(tYear, tMonth, tDate);
  const tomorrow = new Date(tYear, tMonth, tDate + 1);

  let isOverdue = today > date ? "기한 초과, " : "";

  if (today.toString() === date.toString()) {
    return <span className="due-date today">오늘</span>;
  }
  if (tomorrow.toString() === date.toString()) {
    return <span className="due-date">내일</span>;
  }

  return (
    <>
      <span className={`${today > date ? "over-due" : ""} due-date`}>
        {`${isOverdue}${tYear !== thisYear ? thisYear + "년 " : ""}${
          thisMonth + 1
        }월 ${thisDate}일 (${thisDay})`}
      </span>
    </>
  );
};

export default DueDateText;
