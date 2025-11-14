import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTestDataAction } from "../asyncActions/counterAsyncAction";
const CounterState = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  //同步reducers
  reducers: {
    incremented: (state) => {
      // Redux Toolkit 允许在 reducers 中编写 "mutating" 逻辑。
      // 它实际上并没有改变 state，因为使用的是 Immer 库，检测到“草稿 state”的变化并产生一个全新的
      // 基于这些更改的不可变的 state。
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => { 
    builder.addCase(getTestDataAction.fulfilled, (state, action) => {
      console.log("异步请求的数据",action.payload);
    })
  }
});
export const { incremented, decremented } = CounterState.actions;
export default CounterState.reducer;
