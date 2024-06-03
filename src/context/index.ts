import React from 'react';

export interface IConfig {
  permissionData?: any;
  checkPermission?: (data: any, code: string) => boolean;
}

export const configContext = React.createContext<IConfig>({});
export const YcConfigProvider = configContext.Provider;
