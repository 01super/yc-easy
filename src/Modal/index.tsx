import { Modal, ModalFuncProps } from 'antd';
import './index.module.less';

const BaseModal = () => {
  return <div>modal 开发中 </div>;
};
BaseModal.open = (props?: ModalFuncProps) => {
  return Modal.confirm({
    ...props,
    icon: null,
    closable: true,
    className: 'sc-base-modal',
    bodyStyle: { padding: 0 },
  });
};
export default BaseModal;
