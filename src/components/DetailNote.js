import React from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../modules/todo";
import { onUpdateNote } from "../lib/firebase/todosData";

const DetailNote = ({ todoId, note }) => {
  const dispatch = useDispatch();
  const onChange = ({ target }) => {
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
    dispatch(updateNote(todoId, target.value));
    onUpdateNote(todoId, target.value);
  };
  const onFocus = ({ target }) => {
    target.parentNode.classList.add("edit");
  };
  const onBlur = ({ target }) => {
    target.parentNode.classList.remove("edit");
  };
  return (
    <div className="datail-note">
      <textarea
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={note}
        placeholder="메모를 입력해주세요."
        rows="1"
      />
    </div>
  );
};

export default React.memo(DetailNote);
