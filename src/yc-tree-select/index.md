# TreeSelect 树形选择

支持异步函数和权限判断的按钮

```jsx
import { YcTreeSelect } from 'yc-easy';
import { useState } from 'react';
import { Form, Button } from 'antd';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

export default () => {
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();
  console.log('value: ', value);
  return (
    <>
      <Form
        form={form}
        onValuesChange={(v) => {
          console.log(v);
        }}
      >
        <Form.Item name="tree" label="树子啊">
          <YcTreeSelect treeData={treeData} style={{ width: 400 }} />
        </Form.Item>
      </Form>
      <Button
        onClick={() => {
          form.setFieldValue('tree', ['0-0', '0-0-0']);
        }}
      >
        设置默认值
      </Button>
    </>
  );
};
```
