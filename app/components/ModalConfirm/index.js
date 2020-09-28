/**
 *
 * ModalConfirm
 *
 */

import React from 'react';
import { Modal, Button } from 'antd';

const ModalConfirm = props => {
  	return (
	    <div>
	    	<Modal
	    		title={props.title}
	    		visible={props.visible}
	    		onCancel={props.onCancel}
	    		footer={
	    			<div>
	    				<Button disabled={props.loading} type="default" onClick={props.onCancel}>Cancelar</Button> 
	    				<Button loading={props.loading} type="primary" onClick={props.onOk}>Aceptar</Button>
	    			</div>
	    		}
	    	>
	    		{props.subtitle}
	    	</Modal>
	    </div>
  	);
}

ModalConfirm.propTypes = {};

export default ModalConfirm;
