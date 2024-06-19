import { Button, Form, FormProps, Space } from 'antd';
import { FC, ReactNode } from 'react';
import YcSearchContext from './context';

export interface YcSearchProps extends FormProps {
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

  actions?: ReactNode;
}

const YcSearch: FC<YcSearchProps> = (props) => {
  const {
    columnGap = 10,
    itemWidth,
    rowCount = 4,
    cancel,
    cancelText,
    style: formStyle = {},
    children,
    actions,
    ...formProps
  } = props;

  const underRowCountWidth = `calc( ( 100% - ${
    (rowCount - 1) * columnGap
  }px ) / ${rowCount} )`;

  return (
    <YcSearchContext.Provider
      value={{ rowCount, columnGap, itemWidth, underRowCountWidth }}
    >
      <Form
        style={{ ...formStyle, display: 'flex', flexWrap: 'wrap', columnGap }}
        {...formProps}
      >
        {children}
        <div
          style={{
            width: itemWidth,
            flex: 1,
            marginBottom: 24,
            textAlign: 'right',
          }}
        >
          {actions ?? (
            <Space>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
              <Button onClick={cancel}>{cancelText ?? '重置'}</Button>
            </Space>
          )}
        </div>
      </Form>
    </YcSearchContext.Provider>
  );
};

export default YcSearch;
