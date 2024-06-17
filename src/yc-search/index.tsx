import { Button, Spin } from 'antd';
import { DesignTokenContext } from 'antd/es/theme/context';
import React from 'react';

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;

export default function App() {
  const [primaryColor, setPrimaryColor] = React.useState(randomColor());

  return (
    <div style={{ background: 'rgba(0,0,0,0.1)', padding: 16 }}>
      <h3>随机样式，新的 Token 生成删除原本的全部 style</h3>

      <DesignTokenContext.Provider
        value={{
          token: {
            primaryColor,
          },
        }}
      >
        <div style={{ display: 'flex', columnGap: 8 }}>
          <Button type="primary" onClick={() => setPrimaryColor(randomColor())}>
            Random Primary Color
          </Button>
          <Spin />
        </div>
      </DesignTokenContext.Provider>
    </div>
  );
}
