import { getDatabase, ref, set, off, onValue } from "firebase/database";
import store from "../../modules";
import produce from "immer";

const db = getDatabase();

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

// Steps
export const onAddStep = (todoId, newStep, type) => {
  const { todos } = store.getState().todoReducer;
  const update = produce(todos, (draft) => {
    const todoIndex = draft.findIndex((todo) => todo.id === todoId);
    draft[todoIndex].steps
      ? (draft[todoIndex].steps = [newStep, ...draft[todoIndex].steps])
      : (draft[todoIndex].steps = [{ ...newStep }]);
  });
  onUpdateTodos(update);
};

export const onUpdateDueDate = (todoId, newDueDate, type) => {
  const { todos } = store.getState().todoReducer;
  const update = produce(todos, (draft) => {
    const todoIndex = draft.findIndex((todo) => todo.id === todoId);
    draft[todoIndex].dueDate = newDueDate;
  });
  onUpdateTodos(update);
};

export const onRemoveStep = (todoId, stepId) => {
  const { todos } = store.getState().todoReducer;
  const update = produce(todos, (draft) => {
    const todoIndex = draft.findIndex((todo) => todo.id === todoId);
    const newSteps = draft[todoIndex].steps.filter(
      (step) => step.id !== stepId
    );
    draft[todoIndex].steps = newSteps || [];
  });
  onUpdateTodos(update);
};
export const onUpdateStep = (todoId, value, index, type) => {
  const { todos } = store.getState().todoReducer;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  const update = produce(todos, (draft) => {
    draft[todoIndex].steps[index].title = value;
  });
  onUpdateTodos(update);
};

export const onCheckStep = (todoId, index) => {
  const { todos } = store.getState().todoReducer;
  const update = produce(todos, (draft) => {
    const todoIndex = draft.findIndex((todo) => todo.id === todoId);
    const isCheck = draft[todoIndex].steps[index].check ? false : true;
    draft[todoIndex].steps[index].check = isCheck;
  });
  onUpdateTodos(update);
};
export const onUpdateNote = (todoId, text) => {
  const { todos } = store.getState().todoReducer;
  const update = produce(todos, (draft) => {
    const todoIndex = draft.findIndex((todo) => todo.id === todoId);

    draft[todoIndex].note = text;
  });
  onUpdateTodos(update);
};

// Update
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
