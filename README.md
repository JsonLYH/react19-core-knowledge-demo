# useEffect 场景
![alt text](image-1.png)
## 1、每次渲染后都执行
```js
useEffect(() =>
{
// 每次组件渲染后都会执行
console.log('组件已渲染或更新');
});
```
## 2、仅在组件挂载时执行
```js
useEffect(() =>
{
// 只在组件挂载时执行一次
console.log('组件已挂载');
return () =>
{
// 清理函数，在组件卸载时执行
console.log('组件即将卸载');
};
}, []);
// 空依赖数组
```
## 3、依赖特定值变化时执行
```js
useEffect(() =>
{
// 当 count 或 name 变化时执行
console.log(`Count: ${count
}, Name: ${name
}`);
return () =>
{
// 清理上一次的 effect
console.log('清理上一次的 effect');
};
}, [count, name]);
// 依赖数组
```
# classnames 库结合css模块使用
```
import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

const Button = ({ primary, size }) => {
  const buttonClass = classNames(styles.btn, {
    [styles.primary]: primary,
    [styles.large]: size === 'large',
    [styles.small]: size === 'small',
  });

  return (
    <button className={buttonClass}>
      Button
    </button>
  );
};

export default Button;
```
# classnames 库结合styled-components使用
```
import styled from 'styled-components';
import classNames from 'classnames';

const StyledButton = styled.button`
  &.btn-primary {
    background-color: blue;
  }
  &.btn-large {
    font-size: 1.5em;
  }
`;

const Button = ({ primary, size }) => {
  const buttonClass = classNames('btn', {
    'btn-primary': primary,
    'btn-large': size === 'large',
  });

  return (
    <StyledButton className={buttonClass}>
      Button
    </StyledButton>
  );
};

export default Button;
```
# 关于redux中useSelector的性能优化
## 使用浅比较进行优化
```js
// ❌ 错误：每次state变化都触发渲染
const user = useSelector(state => state.user);

// ✅ 正确：仅当user变化时渲染
const user = useSelector(state => state.user, shallowEqual);

```
## 按字段进行精确选择
```js
// 仅当name变化时重新渲染
const userName = useSelector(state => state.user.name);

```
## 创建记忆化选择器
```js
import { createSelector } from '@reduxjs/toolkit';

const selectUser = state => state.user;
const selectTheme = state => state.theme;

// 创建记忆化选择器
const selectUserAndTheme = createSelector(
  [selectUser, selectTheme],
  (user, theme) => ({ user, theme })
);

// 组件中使用
const { user, theme } = useSelector(selectUserAndTheme);

```
# 状态管理方式
1.组件中自己的state管理
2.Context数据的共享状态
3.Redux管理应用状态
# 项目中推荐的state管理方案
1.UI相关的组件内部可以维护的状态，在组件内部自己来维护；
2.大部分需要共享的状态，都交给redux来管理和维护；
3.从服务器请求的数据（包括请求的操作），交给redux来维护；
