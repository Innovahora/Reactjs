/**
 *
 * ProfileForm
 *
 */

import React from 'react';
import { Button, Form, Checkbox, Select, Card, Input, Row, Col } from 'antd';
import { exist } from '../../utils/functions';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const ProfileForm = props => {
	const formRef = React.createRef();
	const [id, setId] = React.useState(null);
	const [name, setName] = React.useState('');
	const [modules, setModules] = React.useState([]);

	const handleSubmit = () =>{
		const dataRequest = {
			id,
			name,
			modules,
		};

		props.onSubmit(dataRequest);
	};

	React.useEffect(() => {

	    if (props.visible) {

			setId(exist(props.data) ? props.data.id : '');
			setName(exist(props.data) ? props.data.profile : '');
			setModules(exist(props.data) ? props.data.modules : []);

			formRef.current.setFieldsValue({
				id: exist(props.data) ? props.data.id : '',
				name: exist(props.data) ? props.data.profile : '',
			});

	    }

	}, [props.visible]);

	const handleChangeModule = modules => {
		setModules(modules);
	};

	return (
		<div>
			<Form {...layout} ref={formRef} name="profile" onFinish={handleSubmit}>
	            <Form.Item
	              label="Perfil"
	              name="name"
	              rules={[{ required: true, message: 'Ingrese un perfil' }]}
	            >
	              	<Input
	                	name="name"
	                	value={name}
	                	onChange={({ target }) => setName(target.value)}
	              	/>
	            </Form.Item>

	            <label>Permisos:</label>

	            <Checkbox.Group value={modules} style={{ width: '100%', marginTop: 10, marginBottom: 10 }} onChange={handleChangeModule}>
	            	<Row>
	            	{
	            		props.modules.map((module, index) => {
			            	return <Col span={12} key={index} style={{ paddingTop: 5, paddingBottom: 5 }}>
					        	<Checkbox value={parseInt(module.value)}>{module.label}</Checkbox>
					      	</Col>
	            		})
	            	}
	            	</Row>
	            </Checkbox.Group>

	            <Form.Item>
		          	<div align="right">
			            <Button
			              disabled={props.loading}
			              onClick={props.onCancel}
			              type="default"
			              htmlType="button"
			            >
			            	Cancelar
			            </Button>{' '}
			            <Button loading={props.loading} type="primary" htmlType="submit">
			            	Guardar
			            </Button>
		          	</div>
		        </Form.Item>
			</Form>
		</div>
	);
}

ProfileForm.propTypes = {};

export default ProfileForm;
