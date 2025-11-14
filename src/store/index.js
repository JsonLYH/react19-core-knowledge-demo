import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./reducer/counter";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// 合并所有的reducer
export const rootReducer = combineReducers({
  counter: counterReducer,
});
// 实现loggerMiddleware,注意这里的函数嵌套结构
const loggerMiddleware = (store) => (next) => (action) => {
  console.log("action", action);
  //中间如果有异步请求，会等待异步请求完成
  const result = next(action);
  console.log("result", result);
  return result;
};
const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};
const myPersistReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: myPersistReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // 注意关闭serializableCheck,否则会报错
        serializableCheck: false,
      }).concat(loggerMiddleware),
})
export const persistor = persistStore(store);
