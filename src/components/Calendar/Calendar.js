import React, { useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import "./Calendar.scss";

const Calendar = (props) => {
  const [thisCalendar, setThisCalendar] = useState(null);
  const [currentDate, setCurrentDate] = useState({
    date: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const calendarMaker = () => {
    const prevLast = new Date(currentDate.year, currentDate.month, 0);
    const thisLast = new Date(currentDate.year, currentDate.month + 1, 0);

    const prevLastDate = prevLast.getDate();
    const prevLastDay = prevLast.getDay();

    const thisLastDate = thisLast.getDate(); // 31
    const thisLastDay = thisLast.getDay(); // 1

    const prevDates = [];
    const thisDates = [...Array(thisLastDate + 1).keys()].slice(1);
    const nextDates = [];

    if (prevLastDay !== 6) {
      for (let i = 0; i < prevLastDay + 1; i++) {
        prevDates.unshift(prevLastDate - i);
      }
    }
    // 다음달 날짜 계산
    for (let i = 1; i < 7 - thisLastDay; i++) {
      nextDates.push(i);
    }
    setThisCalendar({ prev: prevDates, thisDate: thisDates, next: nextDates });
  };

  const clickPrev = () => {
    const time = currentDate.date.setMonth(currentDate.month - 1);
    const date = new Date(time);
    setCurrentDate({ date, year: date.getFullYear(), month: date.getMonth() });
  };
  const clickNext = () => {
    const time = currentDate.date.setMonth(currentDate.month + 1);
    const date = new Date(time);
    setCurrentDate({ date, year: date.getFullYear(), month: date.getMonth() });
  };

  useEffect(() => {
    calendarMaker();
  }, [currentDate]);

  return (
    <div className="todo-calendar">
      <div className="calendar-top">
        <span className="year-month">{`${currentDate.year}년 ${
          currentDate.month + 1
        }월`}</span>
        <div className="calendar-btn">
          <button className="prev" onClick={clickPrev}>
            <i className="arr-icon prev">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14.04 29.89"
                width="15"
                height="20"
              >
                <g>
                  <polygon points="12.38,26.99 0.33,14.94 12.38,2.9 13.08,3.61 1.75,14.94 13.08,26.28 	" />
                </g>
              </svg>
            </i>
          </button>
          <button className="next" onClick={clickNext}>
            <i className="arr-icon next">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14.04 29.89"
                width="15"
                height="20"
              >
                <g>
                  <polygon points="12.38,26.99 0.33,14.94 12.38,2.9 13.08,3.61 1.75,14.94 13.08,26.28 	" />
                </g>
              </svg>
            </i>
          </button>
        </div>
      </div>
      <div className="calendar-days">
        <div className="cell">일</div>
        <div className="cell">월</div>
        <div className="cell">화</div>
        <div className="cell">수</div>
        <div className="cell">목</div>
        <div className="cell">금</div>
        <div className="cell">토</div>
      </div>
      <div className="calendar-dates">
        {thisCalendar &&
          thisCalendar?.prev.map((day, i) => (
            <div key={i} className="prev-dates cell">
              {day}
            </div>
          ))}
        {thisCalendar &&
          thisCalendar?.thisDate.map((day, i) => (
            <div key={i} className="date cell">
              {day}
            </div>
          ))}
        {thisCalendar &&
          thisCalendar?.next.map((day, i) => (
            <div key={i} className="next-dates cell">
              {day}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Calendar;
