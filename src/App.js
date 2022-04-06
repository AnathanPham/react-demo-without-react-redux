import { useCallback, useEffect, useReducer } from "react";
import "./App.css";
import store from "./store";

function App() {
  const { count, timestamp } = store.getState();
  // 函数组件没有提供class组件的forceUpdate，我们模拟这个方法
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const handleAddCount = useCallback(() => {
    store.dispatch({
      type: "ADD",
      payload: undefined,
    });
  }, []);
  const handleSetTime = useCallback(() => {
    store.dispatch({
      type: "TIMESTAMP",
      payload: Date.now(),
    });
  }, []);
  // 订阅
  useEffect(() => {
    const callback = () => {
      const newState = store.getState();
      const newCount = newState.count;
      // 我们模拟React-Redux的mapStateToProps优化的场景。我们确保了props永远是最新的。
      if (newCount !== count) {
        // 安排React更新
        forceUpdate();
      }
    };
    return store.subscribe(callback);
  }, [count]);

  return (
    <div className="App">
      <h2>手动绑定React和Redux</h2>
      <p>count:{count}</p>
      <button onClick={handleAddCount}>add count</button>
      <p>timestamp:{timestamp}</p>
      <p className="tiny">如果不订阅store，store更新后不会引起React更新</p>
      <button onClick={handleSetTime}>set timestamp</button>
    </div>
  );
}

export default App;
