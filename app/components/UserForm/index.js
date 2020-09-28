/**
 *
 * UserForm
 *
 */

import React from 'react';
import { Button, Form, Select, Card, Input, Row, Col } from 'antd';
import { exist } from '../../utils/functions';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

const UserForm = props => {
  const formRef = React.createRef();

  const [id, setId] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [montherLastname, setMotherLastname] = React.useState('');
  const [charge, setCharge] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [profile, setUserProfile] = React.useState([]);
  const [area, setArea] = React.useState([]);

  React.useEffect(() => {
    if (props.visible) {

      setId(exist(props.data) ? props.data.id : '');
      setUsername(exist(props.data) ? props.data.username : '');
      setEmail(exist(props.data) ? props.data.email : '');
      setName(exist(props.data) ? props.data.name : '');
      setLastname(exist(props.data) ? props.data.lastname : '');
      setMotherLastname(exist(props.data) ? props.data.monther_lastname : '');
      setCharge(exist(props.data) ? props.data.charge : '');
      setUserProfile(exist(props.data) ? props.data.id_profile : []);
      setArea(exist(props.data) ? props.data.id_area : []);

      formRef.current.setFieldsValue({
        email: exist(props.data) ? props.data.email : '',
        name: exist(props.data) ? props.data.name : '',
        username: exist(props.data) ? props.data.username : '',
        lastname: exist(props.data) ? props.data.lastname : '',
        montherLastname: exist(props.data) ? props.data.monther_lastname : '',
        charge: exist(props.data) ? props.data.charge : '',
        profile: exist(props.data) ? props.data.id_profile : [],
        area: exist(props.data) ? props.data.id_area : [],
      });

    }
  }, [props.visible]);

  const handleSubmit = () => {
    const dataUserdata = {
      id,
      username,
      email,
      name,
      lastname,
      montherLastname,
      charge,
      profile,
      area,
      password,
    };
    props.onSubmit(dataUserdata);
  };

  return (
    <div>
      <Form {...layout} ref={formRef} name="basic" onFinish={handleSubmit}>
        <Row>
          <Col span={8} className="pl-10 pr-10">
            <Form.Item
              label="Correo"
              name="email"
              rules={[{ required: true, message: 'Ingrese un correo' }]}
            >
              <Input
                name="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={8} className="pl-10 pr-10">
            <Form.Item
              label="Nombre de Usuario"
              name="username"
              rules={[{ required: true, message: 'Ingrese un usuario' }]}
            >
              <Input
                name="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={8} className="pl-10 pr-10">
            <Form.Item
              label={(id > 0) ? "Cambiar contraseña" : "Contraseña"}
              name="password"
              rules={(id > 0) ? [] : [{ required: true, message: 'Ingrese una contraseña' }] }
            >
              <Input
                type="password"
                name="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="pl-10 pr-10">
            <Form.Item
              label="Nombres"
              name="name"
              rules={[{ required: true, message: 'Ingrese nombres' }]}
            >
              <Input
                name="name"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="pl-10 pr-10">
            <Form.Item
              label="Apellido Paterno"
              name="lastname"
              rules={[{ required: true, message: 'Ingrese apellido paterno' }]}
            >
              <Input
                name="lastname"
                value={lastname}
                onChange={({ target }) => setLastname(target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="pl-10 pr-10">
            <Form.Item
              label="Apellido Materno"
              name="montherLastname"
              rules={[{ required: true, message: 'Ingrese apellido materno' }]}
            >
              <Input
                name="montherLastname"
                value={montherLastname}
                onChange={({ target }) => setMotherLastname(target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="pl-10 pr-10">
            <Form.Item
              label="Área"
              name="area"
              rules={[{ required: true, message: 'Selecciona un cargo' }]}
            >
              <Select
                value={area}
                loading={props.loadingAreas}
                onChange={area => setArea(area)}
              >
                {props.areas.map(area => (
                  <Option key={area.id_area} value={area.id_area}>
                    {area.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="pl-10 pr-10">
            <Form.Item
              label="Cargo"
              name="charge"
              rules={[{ required: true, message: 'Ingrese un cargo' }]}
            >
              <Input
                name="charge"
                value={charge}
                onChange={({ target }) => setCharge(target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="pl-10 pr-10">
            <Form.Item
              label="Tipo de usuario"
              name="profile"
              rules={[{ required: true, message: 'Selecciona un cargo' }]}
            >
              <Select
                value={profile}
                loading={props.loadingProfiles}
                onChange={profile => setUserProfile(profile)}
              >
                {props.profiles.map(profileItem => (
                  <Option
                    key={profileItem.id_profile}
                    value={profileItem.id_profile}
                  >
                    {profileItem.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
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
};

UserForm.propTypes = {};

export default UserForm;
