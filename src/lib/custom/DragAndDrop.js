import { useState } from "react/cjs/react.development";

export const useListDrag = (lists) => {
  const [drag, setDrag] = useState(null);
  let current = null;
  let height = 0;
  let moveY = 0;
  let movePosition = height / 2;

  const onDragStart = (event) => {
    setDrag(event.target);
    event.target.style.opacity = "0.3";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    height = event.target.offsetHeight;
    moveY = event.nativeEvent.offsetY;
    movePosition = height / 2;

    if (movePosition > moveY) {
      event.currentTarget.classList.add("top");
      event.currentTarget.classList.remove("bottom");
    } else {
      event.currentTarget.classList.add("bottom");
      event.currentTarget.classList.remove("top");
    }
    return false;
  };

  const onDragLeave = (event) => {
    if (event.currentTarget !== current) {
      event.currentTarget.classList.remove("bottom");
      event.currentTarget.classList.remove("top");
    }
  };
  const onDragEnter = (event) => {
    current = event.currentTarget;
  };

  const onDrop = (event) => {
    let dragIndex = Number(drag.dataset.index);
    let targetIndex = Number(event.currentTarget.dataset.index);
    let _lists = [...lists];
    let _listItem = _lists[dragIndex];

    event.currentTarget.classList.remove("bottom");
    event.currentTarget.classList.remove("top");

    if (dragIndex == targetIndex) {
      return;
    }

    if (dragIndex < targetIndex) {
      if (movePosition > moveY) {
        _lists.splice(dragIndex, 1);
        _lists.splice(targetIndex - 1, 0, _listItem);
      } else {
        _lists.splice(dragIndex, 1);
        _lists.splice(targetIndex, 0, _listItem);
      }
    }
    if (dragIndex > targetIndex) {
      if (movePosition > moveY) {
        _lists.splice(dragIndex, 1);
        _lists.splice(targetIndex, 0, _listItem);
      } else {
        _lists.splice(dragIndex, 1);
        _lists.splice(targetIndex + 1, 0, _listItem);
      }
    }

    return _lists;
  };

  const onDragEnd = (event) => {
    setDrag(null);
    event.target.style.opacity = "1";
  };

  return {
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragLeave,
    onDragEnter,
    onDrop,
  };
};
