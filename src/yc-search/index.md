# Search 搜索

flex 布局的搜索组件

```jsx
import { YcSearch } from 'yc-easy';
import { Input } from 'antd';

export default () => (
  <YcSearch rowCount={3}>
    <YcSearch.Item label="我好看吗">
      <Input />
    </YcSearch.Item>
    <YcSearch.Item label="我好看吗">
      <Input />
    </YcSearch.Item>
    <YcSearch.Item label="我好看好看吗">
      <Input />
    </YcSearch.Item>
    <YcSearch.Item label="我好看吗">
      <Input />
    </YcSearch.Item>
    <YcSearch.Item label="我好看吗">
      <Input />
    </YcSearch.Item>
    <YcSearch.Item label="看吗">
      <Input />
    </YcSearch.Item>
    <YcSearch.Item label="我好看吗我好看吗">
      <Input />
    </YcSearch.Item>
    <YcSearch.Item label="我好看吗">
      <Input />
    </YcSearch.Item>
    <YcSearch.Item label="我好看吗">
      <Input />
    </YcSearch.Item>
  </YcSearch>
);
```
