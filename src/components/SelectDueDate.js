import React, { useEffect, useState, useRef } from "react";
import Calendar from "./Calendar/Calendar";
import DueDateText from "./Todo/DueDateText";

const SelectDueDate = ({ dueDate, onSelectDueDate }) => {
  const calendarRef = useRef();
  const [openCalendar, setOpenCalendar] = useState(false);

  const showCalendar = () => {
    setOpenCalendar(true);
  };

  const closeCalender = () => {
    setOpenCalendar(false);
  };

  const seleteDueDate = (date) => {
    onSelectDueDate(date);
    closeCalender();
  };

  const handleClickOutside = ({ target }) => {
    if (openCalendar && !calendarRef.current?.contains(target)) {
      closeCalender();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [openCalendar]);

  return (
    <>
      <button className="due-date__button" onClick={showCalendar}>
        {!dueDate && <span>기한 설정</span>}
        {dueDate && <DueDateText dueDate={dueDate} />}
      </button>
      {openCalendar && (
        <Calendar ref={calendarRef} seleteDueDate={seleteDueDate} />
      )}
    </>
  );
};

export default SelectDueDate;
