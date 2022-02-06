import "./App.scss";
import Header from "./components/Header/Header";
import Todos from "./components/Todo/Todos";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Join from "./components/Join/Join";
import "./lib/firebase/firebase";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Route path="/" render={() => <Todos />} exact />
          <Route path="/join" render={() => <Join />} />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
