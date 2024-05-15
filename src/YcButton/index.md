# Button

支持异步函数的按钮

```jsx
import { YcButton } from 'yc-easy';

export default () => <YcButton action={() => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 1500)
    })
  }} 
  type='primary'
  >异步按钮</YcButton>
```
