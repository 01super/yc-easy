import { Button, ButtonProps } from 'antd';
import React, { ReactElement, ReactNode, useState, type FC } from 'react';
import useConfiguration from 'yc-easy/hooks/useConfiguration';

interface YcButtonProps<T = Element> extends ButtonProps {
  action: (event: React.MouseEvent<T, MouseEvent>) => Promise<any>;
  children?: ReactElement;
  /**
   * 权限 key，需要在 ConfigProvider 中配置 permissionData 和 checkPermission
   */
  authKey?: string;
  unAuthorizedDisplay?: ReactNode;
}

const YcButton: FC<YcButtonProps> = ({
  action,
  children,
  onClick,
  authKey,
  unAuthorizedDisplay,
  ...props
}) => {
  const { permissionData, checkPermission } = useConfiguration();

  const [loading, setLoading] = useState(false);

  if (authKey && checkPermission && permissionData) {
    const hasAuthorized = checkPermission(permissionData, authKey);
    if (!hasAuthorized) return unAuthorizedDisplay ?? null;
  }

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
