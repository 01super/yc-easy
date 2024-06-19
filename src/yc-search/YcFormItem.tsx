import { FormItemProps } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { FC, ReactNode, useContext } from 'react';
import YcSearchContext from './context';

interface YcSearchItemProps extends FormItemProps {
  /**
   * 列之间的间隔，单位 px
   * @default 10
   */
  columnGap?: number;
  /**
   * 每一列的宽度，优先级高于 rowCount
   */
  itemWidth?: string | number;
  /**
   * 每一行的列数
   * @default 4
   */
  rowCount?: number;

  cancel?: () => void;

  cancelText?: string;

  children: ReactNode;
}

const YcFormItem: FC<YcSearchItemProps> = (props) => {
  const { children, style = {}, ...formProps } = props;
  const { itemWidth, underRowCountWidth } = useContext(YcSearchContext);

  return (
    <FormItem
      style={{ width: itemWidth ?? underRowCountWidth, ...style }}
      {...formProps}
    >
      {children}
    </FormItem>
  );
};

export default YcFormItem;
