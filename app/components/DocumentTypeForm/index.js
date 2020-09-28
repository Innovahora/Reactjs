/**
 *
 * DocumentTypeForm
 *
 */

import React from 'react';
import { Form, Input, Button } from 'antd';
import { exist } from '../../utils/functions';

const DocumentTypeForm = props => {
	const formRef = React.createRef();

	const [typeId, setType] = React.useState(null);
	const [name, setName] = React.useState('');
	const [code, setCode] = React.useState('');

	const onSubmit = () => {
		const dataArea = {
			typeId,
			name,
			code,
		};
		props.onOk(dataArea);
	};

  	return (
	    <div>
	      <Form ref={formRef} layout="vertical" onFinish={onSubmit}>
	        <Form.Item
	          name="name"
	          label="Nombre"
	          rules={[{ required: true, message: 'Ingrese un nombre' }]}
	        >
	          <Input
	            name="name"
	            value={name}
	            onChange={({ target }) => setName(target.value)}
	          />
	        </Form.Item>
	        <Form.Item
	          name="code"
	          label="Código (TRES LETRAS)"
	          rules={[{ required: true, message: 'Ingrese un código' }]}
	        >
	          <Input
	            name="code"
	            value={code}
	            onChange={({ target }) => setCode(target.value)}
	          />
	        </Form.Item>
	        <Form.Item>
	          <div align="right">
	            <Button
					type="default"
					onClick={props.onCancel}
					disabled={props.loading}
	            >
	              Cancelar
	            </Button>{' '}
	            <Button
	            	type="primary"
            		loading={props.loading}
            		htmlType="submit">
	              Guardar
	            </Button>
	          </div>
	        </Form.Item>
	      </Form>
	    </div>
  	);
}

DocumentTypeForm.propTypes = {};

export default DocumentTypeForm;
