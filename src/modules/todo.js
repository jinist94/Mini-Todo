import produce from "immer";

const _today = new Date();
const _tomorrow = new Date(_today.setDate(_today.getDate() + 1));

const initialTodos = {
  todos: [
    {
      id: 1,
      title: "1. Todo project",
      dueDate: new Date(),
      steps: [
        { id: 1, title: "레이아웃 만들기" },
        { id: 2, title: "Todo form 만들기" },
        { id: 3, title: "캘린더 만들기" },
      ],
    },
    { id: 2, title: "2. 청소하기", dueDate: _tomorrow, steps: [] },
    { id: 3, title: "3. 공부하기", dueDate: new Date(2021, 11, 21), steps: [] },
    { id: 4, title: "4. 샤워하기", dueDate: new Date(2022, 11, 21), steps: [] },
    { id: 5, title: "5. 독서하기", dueDate: "", steps: [] },
  ],
  finished: [],
  selectedTodo: {
    todoData: null,
    element: null,
    index: null,
  },
};

// action type
const ADD_TODO = "todo/ADD_TODO";
const DELETE_TODO = "todo/DELETE_TODO";
const UPDATE_TODO = "todo/UPDATE_TODO";

const ADD_FINISHED = "todo/ADD_FINISHED";
const DELETE_FINISHED = "todo/DELETE_FINISHED";
const UPDATE_FINISHED = "todo/UPDATE_FINISHED";

const ADD_SELECTED_TODO = "todo/ADD_SELECTED_TODO";
const ADD_TODO_STEP = "todo/ADD_TODO_STEP";
const UPDATE_TODO_STEP = "todo/UPDATE_TODO_STEP";
const DELETE_TODO_STEP = "todo/DELETE_TODO_STEP";

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
export const updateFinished = (todo) => {
  return { type: UPDATE_FINISHED, data: { todo } };
};

export const addSelectedTodo = (todo, element, index) => {
  return { type: ADD_SELECTED_TODO, data: { todoData: todo, element, index } };
};

export const addTodoStep = (todoId, step) => {
  return { type: ADD_TODO_STEP, data: { todoId, step } };
};

export const updateTodoStep = (todoId, title, index) => {
  return { type: UPDATE_TODO_STEP, data: { todoId, title, index } };
};

export const deleteTodoStep = (step) => {
  return { type: DELETE_TODO_STEP, data: { step } };
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
    case UPDATE_FINISHED:
      return { ...state, finished: data.todo };
    case ADD_SELECTED_TODO:
      return {
        ...state,
        selectedTodo: {
          todoData: data.todoData,
          element: data.element,
        },
      };
    case ADD_TODO_STEP:
      return produce(state, (draft) => {
        const todoIndex = draft.todos.findIndex(
          (todo) => todo.id === data.todoId
        );
        draft.todos[todoIndex].steps.push(data.step);
        draft.selectedTodo.todoData.steps.push(data.step);
      });
    case UPDATE_TODO_STEP:
      console.log({ ...state, steps: data.steps }, "dataSteps");
      return produce(state, (draft) => {
        const todoIndex = draft.todos.findIndex(
          (todo) => todo.id === data.todoId
        );
        draft.todos[todoIndex].steps[data.index].title = data.title;
        draft.selectedTodo.todoData.steps[data.index].title = data.title;
      });
    case DELETE_TODO_STEP:
      return { ...state, steps: [data.stap, ...state.staps] };
    default:
      return state;
  }
};

export default todoReducer;
