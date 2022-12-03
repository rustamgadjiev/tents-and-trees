import { useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [level, setLevel] = useState(1);

  const handleClick = (e) => {
    setLevel(e.target.textContent);
  }

  return (
    <div className="App">
      <div>
        Уровни
        <button onClick={handleClick}>1</button>
        <button onClick={handleClick}>2</button>
      </div>
      <div className="wrapper">
        <Board level={level} />
      </div>
    </div>
  );
}

export default App;
