import { getDatabase, ref, set, off, onValue } from "firebase/database";
import store from "../../modules";
import produce from "immer";

const db = getDatabase();

const getData = (type) => {
  if (type === "todos") {
    return store.getState().todoReducer.todos;
  }
  if (type === "finished") {
    return store.getState().todoReducer.finished;
  }
  throw new Error("잘못된 todo type 전달");
};
// Todos
export const onAddTodo = (todo) => {
  const { todos } = store.getState().todoReducer;
  const update = [todo, ...todos];
  onUpdateTodos(update);
};

export const onRemoveTodo = (todoId) => {
  const { todos } = store.getState().todoReducer;
  const update = todos.filter((item) => item.id !== todoId);
  onUpdateTodos(update);
};

// Finished
export const onAddFinished = (todo) => {
  const { finished } = store.getState().todoReducer;
  const update = [todo, ...finished];
  onUpdateFinished(update);
};

export const onRemoveFinished = (todoId) => {
  const { finished } = store.getState().todoReducer;
  const update = finished.filter((item) => item.id !== todoId);
  onUpdateFinished(update);
};

export const onUpdateTitle = (todoId, value, type) => {
  const dataType = getData(type);
  const update = produce(dataType, (draft) => {
    const todoIndex = draft.findIndex((todo) => todo.id === todoId);
    draft[todoIndex].title = value;
  });
  onUpdateData(update, type);
};

// Steps
export const onAddStep = (todoId, newStep, type) => {
  const dataType = getData(type);
  const update = produce(dataType, (draft) => {
    const todoIndex = draft.findIndex((todo) => todo.id === todoId);
    draft[todoIndex].steps ? (draft[todoIndex].steps = [...draft[todoIndex].steps, newStep]) : (draft[todoIndex].steps = [{ ...newStep }]);
  });
  onUpdateData(update, type);
};

export const onUpdateDueDate = (todoId, newDueDate, type) => {
  const dataType = getData(type);
  const update = produce(dataType, (draft) => {
    const todoIndex = draft.findIndex((todo) => todo.id === todoId);
    draft[todoIndex].dueDate = newDueDate;
  });
  onUpdateData(update, type);
};

export const onRemoveStep = (todoId, stepId, type) => {
  const dataType = getData(type);
  const update = produce(dataType, (draft) => {
    const todoIndex = draft.findIndex((todo) => todo.id === todoId);
    const newSteps = draft[todoIndex].steps.filter((step) => step.id !== stepId);
    draft[todoIndex].steps = newSteps || [];
  });
  onUpdateData(update, type);
};
export const onUpdateStep = (todoId, value, index, type) => {
  const dataType = getData(type);
  const update = produce(dataType, (draft) => {
    const todoIndex = draft.findIndex((todo) => todo.id === todoId);
    draft[todoIndex].steps[index].title = value;
  });
  onUpdateData(update, type);
};

export const onCheckStep = (todoId, index, type) => {
  const dataType = getData(type);
  const update = produce(dataType, (draft) => {
    const todoIndex = draft.findIndex((todo) => todo.id === todoId);
    const isCheck = draft[todoIndex].steps[index].check ? false : true;
    draft[todoIndex].steps[index].check = isCheck;
  });
  onUpdateData(update, type);
};
export const onUpdateNote = (todoId, text, type) => {
  const dataType = getData(type);
  const update = produce(dataType, (draft) => {
    const todoIndex = draft.findIndex((todo) => todo.id === todoId);
    draft[todoIndex].note = text;
  });
  onUpdateData(update, type);
};

// Update

export const onUpdateData = (updateTodos, type) => {
  const { currentUser } = store.getState().userReducer;
  set(ref(db, `users/${currentUser.uid}/${type}`), updateTodos);
};

export const onUpdateTodos = (updateTodos) => {
  const { currentUser } = store.getState().userReducer;
  set(ref(db, `users/${currentUser.uid}/todos`), updateTodos);
};

export const onUpdateFinished = (updateFinished) => {
  const { currentUser } = store.getState().userReducer;
  set(ref(db, `users/${currentUser.uid}/finished`), updateFinished);
};

export const asyncTodo = (userId, callback) => {
  const todoRef = ref(db, `users/${userId}`);
  onValue(todoRef, (snapshot) => {
    const data = snapshot.val();
    data ? callback(data) : callback({ todos: [], finished: [] });
  });
  return () => off(todoRef);
};

//지정된 경로에 snapshot.val() 값이 있다면 콜백함수 실행.
