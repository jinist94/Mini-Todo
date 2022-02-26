import "./App.scss";
import Header from "./components/Header/Header";
import Todos from "./components/Todo/Todos";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import "./lib/firebase/firebase";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from "./modules/user";
import { asyncTodo } from "./lib/firebase/todosData";

function App() {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return;
    const asyncOff = asyncTodo(currentUser.uid, (data) => {
      console.log(data, "스냅샷 콜백 데이터");
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
          <Route path="/" render={() => <Todos />} exact />
          <Route path="/join" render={() => <Join />} />
          <Route path="/login" render={() => <Login />} />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
