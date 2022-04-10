import { useCallback, useEffect, useReducer } from "react";
import "./App.css";
import store from "./store";

function App() {
  const { count } = store.getState();
  // 函数组件没有提供class组件的forceUpdate，我们模拟这个方法
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // 点击按钮后我们向store派发一个action
  const handleAddCount = useCallback(() => {
    store.dispatch({
      type: "ADD",
    });
  }, []);
  // 订阅store更新
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
    // 组件销毁及时取掉订阅
    return () => store.subscribe(callback);
  }, [count]);
  
  return (
    <div className="App">
      <p>count:{count}</p>
      <button onClick={handleAddCount}>add count</button>
    </div>
  );
}

export default App;
