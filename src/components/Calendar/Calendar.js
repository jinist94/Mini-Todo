import React, { forwardRef, useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import "./Calendar.scss";

const Calendar = forwardRef((props, ref) => {
  const { seleteDueDate } = props;
  const [thisCalendar, setThisCalendar] = useState(null);
  const [currentDate, setCurrentDate] = useState({
    date: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const [clickDate, setClickDate] = useState();

  const calendarMaker = () => {
    const prevLast = new Date(currentDate.year, currentDate.month, 0);
    const thisLast = new Date(currentDate.year, currentDate.month + 1, 0);

    const prevLastDate = prevLast.getDate();
    const prevLastDay = prevLast.getDay();

    const thisLastDate = thisLast.getDate(); // 31
    const thisLastDay = thisLast.getDay(); // 1

    const prevDates = [];
    // const thisDates = [...Array(thisLastDate + 1).keys()].slice(1); //
    const thisDates = [];
    const nextDates = [];
    const today = new Date();

    for (let i = 1; i < thisLastDate + 1; i++) {
      if (
        today.getMonth() === currentDate.month &&
        today.getFullYear() === currentDate.year &&
        today.getDate() === i
      ) {
        thisDates.push([i, "today"]);
      } else {
        thisDates.push([i, "this"]);
      }
    }
    if (prevLastDay !== 6) {
      for (let i = 0; i < prevLastDay + 1; i++) {
        prevDates.unshift([prevLastDate - i, "prev"]);
      }
    }

    for (let i = 1; i < 7 - thisLastDay; i++) {
      nextDates.push([i, "next"]);
    }
    const dates = prevDates.concat(thisDates, nextDates);
    console.log(dates);
    setThisCalendar(dates);
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

  const onClickDate = (event, date) => {
    let month = currentDate.month;

    if (date[1] == "prev") {
      month = currentDate.month - 1;
    }
    if (date[1] == "next") {
      month = currentDate.month + 1;
    }
    const newDate = new Date(currentDate.year, month, date[0]);
    seleteDueDate(newDate);
  };

  useEffect(() => {
    calendarMaker();
  }, [currentDate]);

  return (
    <div className="todo-calendar" ref={ref}>
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
        <div className="t-cell">일</div>
        <div className="t-cell">월</div>
        <div className="t-cell">화</div>
        <div className="t-cell">수</div>
        <div className="t-cell">목</div>
        <div className="t-cell">금</div>
        <div className="t-cell">토</div>
      </div>
      <div className="calendar-dates">
        {thisCalendar &&
          thisCalendar.map((date, i) => (
            <div
              className="cell"
              key={i}
              onClick={(event) => onClickDate(event, date)}
            >
              <span
                className={` ${
                  date[1] == "prev"
                    ? "prev-dates"
                    : date[1] == "next"
                    ? "next-dates"
                    : date[1] == "today"
                    ? "today"
                    : "date"
                } cell-date`}
              >
                {date[0]}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
});
export default Calendar;
