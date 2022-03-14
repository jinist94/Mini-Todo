import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../modules/todo";
import { onUpdateNote } from "../lib/firebase/todosData";
import { useDebounce } from "../lib/custom/useDebounce";

const DetailNote = ({ todoId, note, type }) => {
  const [text, setText] = useState(note);
  const dispatch = useDispatch();
  const debounce = useDebounce();
  const onChange = ({ target }) => {
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
    // dispatch(updateNote(todoId, target.value));
    setText(target.value);
    debounce(onUpdateNote, [todoId, target.value, type]);
  };
  const onFocus = ({ target }) => {
    target.parentNode.classList.add("edit");
  };
  const onBlur = ({ target }) => {
    target.parentNode.classList.remove("edit");
  };
  useEffect(() => {
    setText(note);
  }, [note]);

  return (
    <div className="datail-note">
      <textarea onChange={onChange} onFocus={onFocus} onBlur={onBlur} value={text} placeholder="메모를 입력해주세요." rows="1" />
    </div>
  );
};

export default React.memo(DetailNote);
