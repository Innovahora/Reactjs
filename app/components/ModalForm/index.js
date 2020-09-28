/**
 *
 * ModalForm
 *
 */

import React from 'react';
import { Modal } from 'antd';

const ModalForm = props => (
  <div>
    <Modal
      title={props.title}
      visible={props.visible}
      onClose={props.onCancel}
      onCancel={props.onCancel}
      footer={props.footer}
      onOk={props.onOk}
      width={props.width}
    >
      {props.children}
    </Modal>
  </div>
);

ModalForm.propTypes = {};

ModalForm.defaultProps = {
  width: 500,
};

export default ModalForm;
