const initialTodos = {
  todos: [
    { id: 1, title: "밥먹기" },
    { id: 2, title: "청소하기" },
    { id: 3, title: "공부하기" },
    { id: 4, title: "샤워하기" },
    { id: 5, title: "독서하기" },
  ],
  finished: [],
};

// action type
const ADD_TODO = "todo/ADD_TODO";
const DELETE_TODO = "todo/DELETE_TODO";
const UPDATE_TODO = "todo/UPDATE_TODO";

const ADD_FINISHED = "todo/ADD_FINISHED";
const DELETE_FINISHED = "todo/DELETE_FINISHED";

// action function
export const addTodo = (todo) => {
  return { type: ADD_TODO, data: { todo } };
};

export const deleteTodo = (id) => {
  return { type: DELETE_TODO, data: { id } };
};

export const updateTodo = (todo) => {
  return { type: UPDATE_TODO, data: { todo } };
};

export const addFinished = (todo) => {
  return { type: ADD_FINISHED, data: { todo } };
};

export const deleteFinished = (id) => {
  return { type: DELETE_FINISHED, data: { id } };
};

const todoReducer = (state = initialTodos, action) => {
  const { data } = action;
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [data.todo, ...state.todos] };
    case DELETE_TODO:
      return {
        ...state,
        todos: { ...state }.todos.filter((item) => item.id !== data.id),
      };
    case UPDATE_TODO:
      return { ...state, todos: data.todo };
    case ADD_FINISHED:
      return { ...state, finished: [data.todo, ...state.finished] };
    case DELETE_FINISHED:
      return {
        ...state,
        finished: { ...state }.finished.filter((item) => item.id !== data.id),
      };
    default:
      return state;
  }
};

export default todoReducer;
