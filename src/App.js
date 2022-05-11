import { useCallback } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
const countSelector = (state) => {
  return { count: state.count };
};
function App() {
  const dispatch = useDispatch();
  const count = useSelector(countSelector);
  // 点击按钮后我们向store派发一个action
  const handleAddCount = useCallback(() => {
    dispatch({
      type: "ADD",
    });
  }, [dispatch]);

  return (
    <div className="App">
      <p>count (use react-redux):{count}</p>
      <button onClick={handleAddCount}>add count</button>
    </div>
  );
}

export default App;
