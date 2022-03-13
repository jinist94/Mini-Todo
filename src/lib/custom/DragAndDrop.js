export const useListDrag = (lists) => {
  let height = 0;
  let moveY = 0;
  let movePosition = height / 2;

  const onDragStart = (event) => {
    event.target.style.opacity = "0.3";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "dragUl",
      event.target.closest(".todo-list").className
    );
    event.dataTransfer.setData("dragIndex", event.target.dataset.index);
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
    event.currentTarget.classList.remove("bottom");
    event.currentTarget.classList.remove("top");
  };

  const onDrop = (event) => {
    let dragIndex = Number(event.dataTransfer.getData("dragIndex"));
    let dragUl = event.dataTransfer.getData("dragUl");

    let targetIndex = Number(event.currentTarget.dataset.index);
    let targetUl = event.target.closest(".todo-list").className;
    let _lists = [...lists];
    let _listItem = _lists[dragIndex];

    event.currentTarget.classList.remove("bottom");
    event.currentTarget.classList.remove("top");

    if (dragIndex == targetIndex || dragUl !== targetUl) {
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
    event.target.style.opacity = "1";
  };

  return {
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragLeave,
    onDrop,
  };
};
