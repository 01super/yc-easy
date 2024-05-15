import { Button, ButtonProps } from 'antd';
import React, { ReactElement, useState, type FC } from 'react';

interface YcButtonProps<T = Element> extends ButtonProps {
  action: (event: React.MouseEvent<T, MouseEvent>) => Promise<any>;
  children?: ReactElement;
}

const YcButton: FC<YcButtonProps> = ({
  action,
  children,
  onClick,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    onClick?.(e);
    if (typeof action === 'function') {
      setLoading(true);
      action(e).finally(() => {
        setLoading(false);
      });
    }
  };

  return (
    <Button loading={loading} onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};

export default YcButton;
