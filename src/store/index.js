import { createStore } from "redux";
// Redux会在初始化时，执行一次reducer，用来初始化state
const reducer = (state = { count: 0, timestamp: 0 }, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      return {
        ...state,
        count: state.count + 1,
      };
    case "TIMESTAMP":
      return {
        ...state,
        timestamp: payload,
      };
    default:
      return state;
  }
};
const store = createStore(reducer);
export default store;
