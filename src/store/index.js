import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducer/counter";
// 实现loggerMiddleware,注意这里的函数嵌套结构
const loggerMiddleware = (store) => (next) => (action) => {
  console.log("action", action);
  //中间如果有异步请求，会等待异步请求完成
  const result = next(action);
  console.log("result", result);
  return result;
};

export default configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    counter: counterReducer,
    },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerMiddleware),
});
