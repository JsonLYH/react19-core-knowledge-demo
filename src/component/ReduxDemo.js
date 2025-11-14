import { memo,useEffect } from 'react'
import { useDispatch,useSelector,shallowEqual } from 'react-redux'
import { incremented, decremented } from '../store/reducer/counter'
import { getTestDataAction } from '../store/asyncActions/counterAsyncAction'
export default memo(function ReduxDemo() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getTestDataAction());
    }, []);
  // 仅当counter模块数据发生变化时，才会重新进行渲染（推荐做法）
    const counter = useSelector((state) => state.counter, shallowEqual);
    //只要state发生变化，都会重新进行渲染
  // const counter = useSelector((state) => state.counter);
  return (
    <div>
      <button onClick={() => dispatch(incremented())}>+</button>
      <h1>当前数值：{counter.value}</h1>
      <button onClick={() => dispatch(decremented())}>-</button>
    </div>
  );
})