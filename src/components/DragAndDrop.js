import React from "react";
import { useState } from "react/cjs/react.development";

const list = [
  { id: 1, name: "1. 할 일1" },
  { id: 2, name: "2. 할 일2" },
  { id: 3, name: "3. 할 일3" },
  { id: 4, name: "4. 할 일4" },
  { id: 5, name: "5. 할 일5" },
];

export const DragAndDrop = (props) => {
  const [lists, setLists] = useState(list);
  const [drag, setDrag] = useState(null);
  const [clickTodo, setClickTodo] = useState(null);

  const onDragOver = (event) => {
    event.preventDefault();
    return false;
  };
  const onDragStart = (event) => {
    setDrag(event.target);
    event.target.style.opacity = "0.3";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target);
  };
  const onDragEnd = (event) => {
    setDrag(null);
    event.target.style.opacity = "1";
  };

  const onDragLeave = (event) => {
    event.target.style.border = "0";
  };
  const onDragEnter = (event) => {
    let dragIndex = Number(drag.dataset.index);
    let targetIndex = Number(event.target.dataset.index);
    if (dragIndex < targetIndex) {
      event.target.style.borderBottom = "2px solid #000";
    } else {
      event.target.style.borderTop = "2px solid #000";
    }
  };
  const onDrop = (event) => {
    let dragIndex = Number(drag.dataset.index);
    let targetIndex = Number(event.target.dataset.index);
    console.log(dragIndex, targetIndex);

    let _lists = [...lists];
    let _listItem = _lists[dragIndex];
    if (dragIndex !== targetIndex) {
      _lists.splice(dragIndex, 1);
      _lists.splice(targetIndex, 0, _listItem);
      setLists(_lists);
    }
    event.target.style.border = "0";
  };

  const onClick = (event) => {
    if (clickTodo) {
      clickTodo.classList.remove("selected");
      event.target.classList.add("selected");
    } else {
      event.target.classList.add("selected");
    }
    setClickTodo(event.target);
  };

  return (
    <ul className="drag">
      {lists.map((list, index) => (
        <li
          key={list.id}
          data-index={index}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onMouseDown={onClick}
          draggable
        >
          {list.name}
        </li>
      ))}
    </ul>
  );
};

export default DragAndDrop;
