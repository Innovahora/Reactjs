/**
 *
 * AreaForm
 *
 */

import React from 'react';

import {
  Spin,
  Form,
  Input,
  Select,
  Button,
} from 'antd';

import { exist } from '../../utils/functions';

const AreaForm = props => {
  const formRef = React.createRef();
  let areaId = exist(props.data) ? props.data.id : '';

  const [name, setName] = React.useState(
    exist(props.data) ? props.data.name : '',
  );
  const [code, setCode] = React.useState(
    exist(props.data) ? props.data.code : '',
  );
  const [representative, setRepresentative] = React.useState(
    exist(props.data) ? props.data.representant : '',
  );

  React.useEffect(() => {
    areaId = exist(props.data) ? props.data.id : '';
    setName(exist(props.data) ? props.data.area : '');
    setCode(exist(props.data) ? props.data.codigo : '');
    setRepresentative(exist(props.data) ? props.data.representant : '');

    formRef.current.setFieldsValue({
      name: exist(props.data) ? props.data.area : '',
      code: exist(props.data) ? props.data.codigo : '',
      representative: exist(props.data) ? props.data.representant : '',
    });
  }, []);

  const onSubmit = () => {
    const dataArea = {
      representative,
      areaId,
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
        <Form.Item
          name="representative"
          label="Representante"
        >
          <Select
            onSearch={() => props.searchUser(representative)}
            allowClear
            showSearch
            placeholder="Buscar usuario de destino"
            notFoundContent={
              props.isLoadingUsers ?
              <div align="center">
                <Spin size="small" />
              </div>
              :
              null
            }
            style={{ width: '100%' }}
            filterOption={false}
            value={representative}
            onChange={(representative) => setRepresentative(representative)}
            loading={props.isLoadingUsers}
            name="representative">
            {
              props.users.map((item, index) => {
                return <Select.Option key={index} value={item.id}>{ `${item.name} ${item.lastname}` }</Select.Option>
              })
            }
          </Select>
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
            <Button type="primary" loading={props.loading} htmlType="submit">
              Guardar
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

AreaForm.propTypes = {};

export default AreaForm;
