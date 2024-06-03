import { SearchOutlined } from '@ant-design/icons';
import ButtonPro from 'yc-easy/ButtonPro';
import './index.less';

const ButtonComponent = () => {
  return (
    <div className="components-button-demo-1">
      <ButtonPro>默认按钮</ButtonPro>
      <ButtonPro type="primary">常用按钮</ButtonPro>
      <ButtonPro type="link" href="https://www.baidu.com">
        Link 按钮
      </ButtonPro>
      <ButtonPro type="text">文本按钮</ButtonPro>
      <ButtonPro loading>loading中</ButtonPro>
      <ButtonPro disabled>无法点击</ButtonPro>
      <ButtonPro icon={<SearchOutlined />}>自定义图标</ButtonPro>
      <ButtonPro onClick={() => alert(111)}>点击事件</ButtonPro>
      <ButtonPro permission="HXT0001">有权限才展示</ButtonPro>
    </div>
  );
};
export default ButtonComponent;
