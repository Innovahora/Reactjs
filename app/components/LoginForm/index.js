/**
 *
 * LoginForm
 *
 */

import React from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import LogoAFP from '../../images/asociacion-afp.jpg';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = props => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    const dataRequest = {
      username,
      password,
    };
    props.onSubmit(dataRequest);
  };

  return (
    <div>
      <Row>
        <Col span={6} offset={9}>
          <p align="center">
            <img src={LogoAFP} width={220} alt="Asociación de AFP" />
          </p>
          <Form {...layout} name="basic" onFinish={handleLogin}>
            <Form.Item
              label="Usuario"
              name="username"
              rules={[{ required: true, message: 'Ingrese un usuario' }]}
            >
              <Input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'Ingrese una contraseña' }]}
            >
              <Input.Password
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button loading={props.loading} type="primary" htmlType="submit">
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
