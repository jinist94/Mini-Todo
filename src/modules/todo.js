import produce from "immer";

const initialTodos = {
  todos: [],
  finished: [],
  selectedTodo: {
    todoData: null,
    element: null,
    type: null,
  },
};

// action type
const UPDATE_TODO = "todo/UPDATE_TODO";

const UPDATE_FINISHED = "todo/UPDATE_FINISHED";

const ADD_SELECTED_TODO = "todo/ADD_SELECTED_TODO";

const UPDATE_TODO_TITLE = "todo/UPDATE_TODO_TITLE";
const UPDATE_DUEDATE = "todo/UPDATE_DUEDATE";

const ADD_STEP = "todo/ADD_STEP";
const UPDATE_STEP = "todo/UPDATE_STEP";
const DELETE_STEP = "todo/DELETE_STEP";
const UPDATE_STEP_CHECK = "todo/UPDATE_STEP_CHECK";
const UPDATE_NOTE = "todo/UPDATE_NOTE";

// action function

export const updateTodo = (todo) => {
  return { type: UPDATE_TODO, data: { todo } };
};

export const updateFinished = (todo) => {
  return { type: UPDATE_FINISHED, data: { todo } };
};

export const addSelectedTodo = (todo, type) => {
  return { type: ADD_SELECTED_TODO, data: { todoData: todo, type } };
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

export const updateNote = (todoId, text) => {
  return { type: UPDATE_NOTE, data: { todoId, text } };
};

const todoReducer = (state = initialTodos, action) => {
  const { data } = action;
  switch (action.type) {
    case UPDATE_TODO:
      return { ...state, todos: data.todo };
    case UPDATE_FINISHED:
      return { ...state, finished: data.todo };
    case ADD_SELECTED_TODO:
      return {
        ...state,
        selectedTodo: {
          todoData: data.todoData,
          type: data.type,
        },
      };
    case UPDATE_TODO_TITLE:
      return produce(state, (draft) => {
        draft.selectedTodo.todoData.title = data.title;
      });
    case UPDATE_DUEDATE:
      return produce(state, (draft) => {
        draft.selectedTodo.todoData.dueDate = data.date;
      });
    case ADD_STEP:
      return produce(state, (draft) => {
        draft.selectedTodo.todoData.steps
          ? (draft.selectedTodo.todoData.steps = [
              data.step,
              ...draft.selectedTodo.todoData.steps,
            ])
          : (draft.selectedTodo.todoData.step = [{ ...data.step }]);
      });
    case UPDATE_STEP:
      return produce(state, (draft) => {
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
        draft.selectedTodo.todoData.steps[data.index].check = isCheck;
      });
    case UPDATE_NOTE:
      return produce(state, (draft) => {
        draft.selectedTodo.todoData.note = data.text;
      });
    default:
      return state;
  }
};

export default todoReducer;
