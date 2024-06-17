import { Service } from 'ahooks/lib/useRequest/src/types';
import { TreeSelectProps } from 'antd';

// 输入框的字段
export interface ITreeSelectItem extends TreeSelectProps {
  /**
   * @description 表单项类型
   */
  type?: 'treeSelect';

  /**
   * @description 获取下拉选项的请求
   */
  request?: Service<any, any>;

  /**
   * @description 默认选中所有节点，mode: pro才有此功能
   */
  defaultCheckAll?: boolean;
  /**
   * @description 值发生变化时
   */
  onChange?: (val: any[]) => void;

  /**
   * @description 自定义onChange发生变化时
   */
  onValueChange?: (val: any[]) => void;
}
