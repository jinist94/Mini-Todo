import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTitle } from "../../modules/todo";
import { onUpdateTitle } from "../../lib/firebase/todosData";

const TitleEditForm = ({ todoData, type }) => {
  const [titleValue, setTitleValue] = useState("");
  const dispatch = useDispatch();
  const onTitleChange = (event) => {
    setTitleValue(event.target.value);
  };
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        setTitleValue(todoData.title);
        return;
      }
      event.target.blur();
    }
  };
  const onBlur = (event) => {
    if (event.target.value === "") {
      setTitleValue(todoData.title);
      return;
    }
    dispatch(updateTitle(todoData.id, titleValue, type));
    onUpdateTitle(todoData.id, titleValue, type);
  };

  useEffect(() => {
    setTitleValue(todoData.title);
  }, [todoData]);

  return (
    <form>
      <input value={titleValue} onChange={onTitleChange} onKeyDown={onKeyDown} onBlur={onBlur} />
    </form>
  );
};

export default TitleEditForm;
