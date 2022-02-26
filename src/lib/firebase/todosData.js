import { getDatabase, ref, set, remove, off, onValue } from "firebase/database";

const db = getDatabase();
export const saveTodo = (userId, todo) => {
  set(ref(db, `users/${userId}/todos/${todo.id}`), todo);
};

export const removeTodo = (userId, todoId) => {
  console.log(userId, todoId);
  remove(ref(db, `users/${userId}/todos/${todoId}`));
};

export const asyncTodo = (userId, callback) => {
  const todoRef = ref(db, `users/${userId}/todos`);
  onValue(todoRef, (snapshot) => {
    const data = snapshot.val();
    data && callback(data);
  });
  return () => off(todoRef);
};

//지정된 경로에 snapshot.val() 값이 있다면 콜백함수 실행.
