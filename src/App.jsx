import "./App.scss";
import Header from "./components/Header/Header";
import Todos from "./components/Todo/Todos";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import "./lib/firebase/firebase";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from "./modules/user";
import { asyncTodo } from "./lib/firebase/todosData";
import { updateFinished, updateTodo } from "./modules/todo";

function App() {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return;
    const asyncOff = asyncTodo(currentUser.uid, (data) => {
      console.log(data.todos, "스냅샷 콜백 데이터");
      const getData = {
        todos: data.todos || [],
        finished: data.finished || [],
      };
      dispatch(updateTodo(getData.todos));
      dispatch(updateFinished(getData.finished));
    });
    return () => asyncOff();
  }, [currentUser]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Login Check : ", uid);
        dispatch(setUser(user));
        // ...
      } else {
        console.log("로그인 정보가 없습니다.");
        dispatch(setUser(null));
      }
    });
  }, [currentUser]);
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" render={() => <Todos />} exact />
            <Route path="/signup" render={() => <Signup />} />
            <Route path="/login" render={() => <Login />} />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
