# Button 按钮

支持异步函数和权限判断的按钮

```jsx
import { YcButton, YcConfigProvider } from 'yc-easy';
import { Space } from 'antd';

export default () => (
  <YcConfigProvider
    value={{
      permissionData: ['1', '2', '3'],
      checkPermission: (permissionData, authKey) =>
        permissionData.includes(authKey),
    }}
  >
    <Space>
      <YcButton
        action={() => {
          return new Promise((res, rej) => {
            setTimeout(() => {
              res();
            }, 1500);
          });
        }}
        type="primary"
      >
        异步按钮
      </YcButton>
      <YcButton authKey="1" type="primary">
        有权限才展示
      </YcButton>
      <YcButton authKey="4" type="primary">
        没有权限
      </YcButton>
    </Space>
  </YcConfigProvider>
);
```
