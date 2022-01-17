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
        { id: 1, title: "레이아웃 만들기", check: true },
        { id: 2, title: "Todo form 만들기", check: true },
        { id: 3, title: "캘린더 만들기", check: false },
      ],
    },
    {
      id: 2,
      title: "2. 청소하기",
      dueDate: _tomorrow,
      steps: [],
    },
    {
      id: 3,
      title: "3. 공부하기",
      dueDate: new Date(2021, 11, 21),
      steps: [],
    },
    {
      id: 4,
      title: "4. 샤워하기",
      dueDate: new Date(2022, 11, 21),
      steps: [],
    },
    { id: 5, title: "5. 독서하기", dueDate: "", steps: [] },
  ],
  finished: [],
  selectedTodo: {
    todoData: null,
    element: null,
    type: null,
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

const UPDATE_TODO_TITLE = "todo/UPDATE_TODO_TITLE";
const UPDATE_DUEDATE = "todo/UPDATE_DUEDATE";

const ADD_STEP = "todo/ADD_STEP";
const UPDATE_STEP = "todo/UPDATE_STEP";
const DELETE_STEP = "todo/DELETE_STEP";
const UPDATE_STEP_CHECK = "todo/UPDATE_STEP_CHECK";

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

export const addSelectedTodo = (todo, element, type) => {
  return { type: ADD_SELECTED_TODO, data: { todoData: todo, element, type } };
};

export const updateTitle = (todoId, title, type) => {
  return { type: UPDATE_TODO_TITLE, data: { todoId, title, type } };
};

export const updateDueDate = (todoId, date, type) => {
  return { type: UPDATE_DUEDATE, data: { todoId, date, type } };
};

export const addStep = (todoId, step, type) => {
  return { type: ADD_STEP, data: { todoId, step, type } };
};

export const updateStep = (todoId, title, index, type) => {
  return { type: UPDATE_STEP, data: { todoId, title, index, type } };
};

export const deleteStep = (todoId, stepId) => {
  return { type: DELETE_STEP, data: { todoId, stepId } };
};

export const updateStepCheck = (todoId, index) => {
  return { type: UPDATE_STEP_CHECK, data: { todoId, index } };
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
          type: data.type,
        },
      };
    case UPDATE_TODO_TITLE:
      return produce(state, (draft) => {
        const todoIndex = draft[data.type].findIndex(
          (todo) => todo.id === data.todoId
        );
        draft[data.type][todoIndex].title = data.title;
        draft.selectedTodo.todoData.title = data.title;
      });
    case UPDATE_DUEDATE:
      return produce(state, (draft) => {
        const todoIndex = draft[data.type].findIndex(
          (todo) => todo.id === data.todoId
        );
        draft[data.type][todoIndex].dueDate = data.date;
        draft.selectedTodo.todoData.dueDate = data.date;
      });
    case ADD_STEP:
      return produce(state, (draft) => {
        const todoIndex = draft[data.type].findIndex(
          (todo) => todo.id === data.todoId
        );
        draft[data.type][todoIndex].steps.push(data.step);
        draft.selectedTodo.todoData.steps.push(data.step);
      });
    case UPDATE_STEP:
      return produce(state, (draft) => {
        const todoIndex = draft[data.type].findIndex(
          (todo) => todo.id === data.todoId
        );
        draft[data.type][todoIndex].steps[data.index].title = data.title;
        draft.selectedTodo.todoData.steps[data.index].title = data.title;
      });
    case DELETE_STEP:
      return produce(state, (draft) => {
        const todoIndex = draft.todos.findIndex(
          (todo) => todo.id === data.todoId
        );
        const newSteps = draft.todos[todoIndex].steps.filter(
          (step) => step.id !== data.stepId
        );
        draft.todos[todoIndex].steps = newSteps;
        draft.selectedTodo.todoData.steps = newSteps;
      });
    case UPDATE_STEP_CHECK:
      return produce(state, (draft) => {
        const todoIndex = draft.todos.findIndex(
          (todo) => todo.id === data.todoId
        );
        const isCheck = draft.todos[todoIndex].steps[data.index].check
          ? false
          : true;
        draft.todos[todoIndex].steps[data.index].check = isCheck;
        draft.selectedTodo.todoData.steps[data.index].check = isCheck;
      });
    default:
      return state;
  }
};

export default todoReducer;
