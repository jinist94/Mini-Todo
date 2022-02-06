import "./App.scss";
import Header from "./components/Header/Header";
import Todos from "./components/Todo/Todos";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Todos />
      </div>
    </>
  );
}

export default App;
