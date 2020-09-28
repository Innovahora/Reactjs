/**
 *
 * DocumentTypeFields
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectIsLoadingAddDocumentFields,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import MainLayout from '../../components/MainLayout';
import {
  addFieldsDocument,
} from './actions'
import {
  Col,
  Row,
  Card,
  Form,
  Table,
  Input,
  Select,
  Button,
  Layout,
  Checkbox,
  DatePicker,
  Breadcrumb,
} from 'antd';
const { Header, Content, Sider, Footer } = Layout;

class DocumentTypeFields extends React.Component {

  state = {
    fields: [{
      name: '',
      options: [{
        item: '',
      }],
      type: 1,
      value: '',
    }],
  };

  componentDidMount() {
    const { params } = this.props.match;

    if (parseInt(params.id, 10) > 0) {

      const dataRequest = { id: params.id };

    }

  };

  handleAddField = () => {
    const { fields } = this.state;

    fields.push({
      name: '',
      options: [{
        item: '',
      }],
      type: 1,
      value: '',
    });

    this.setState({ fields });
  };

  handleChangeTypeField = (typeField, indexField) => {
    const { fields } = this.state;

    const newFields = fields.map((field, index) => {
      if (index == indexField) {
        return {
          ...field,
          type: typeField,
        };
      }
      return field;
    });

    this.setState({ fields: newFields });
  };

  handleAddItemFieldOptions = (indexField) => {
    const { fields } = this.state;

    const newOption = {
      item: '',
    };

    const newFields = fields.map((field, index) => {
      if (index == indexField) {
        return {
          ...field,
          options: [...field.options, newOption],
        };
      }
      return field;
    });

    this.setState({ fields: newFields });
  };

  handleDeleteItemFieldOptions = (indexField, indexOption) => {
    const { fields } = this.state;

    const newOption = {
      item: '',
    };

    const newFields = fields.map((field, index) => {
      if (index == indexField) {
        return {
          ...field,
          options: field.options.filter((item, index) => index != indexOption),
        };
      }
      return field;
    });

    this.setState({ fields: newFields });

  };

  handleChangeFieldName = (indexField, { target }) => {
    const { fields } = this.state;

    const newFields = fields.map((field, index) => {
      if (index == indexField) {
        return {
          ...field,
          name: target.value,
        };
      }
      return field;
    });

    this.setState({ fields: newFields });

  };

  handleChangeOptionItem = (indexField, indexOption, { target }) => {
    const { fields } = this.state;

    const newFields = fields.map((field, index) => {
      if (index == indexField) {
        return {
          ...field,
          options: field.options.map((item, indexItems) => {
            if (indexOption == indexItems) {
              return {
                item: target.value,
              }
            }
            return item;
          }),
        };
      }
      return field;
    });

    this.setState({ fields: newFields });
  };

  handleDeleteField = (indexField) => {
    const { fields } = this.state;
    const newFields = fields.filter((field, index) => index != indexField);
    this.setState({ fields: newFields });
  };

  handleSubmitDocument = () => {
    const { params } = this.props.match;

    const { fields } = this.state;

    const dataOptions = [];

    fields.forEach((item, index) => {
      dataOptions.push(item.options);
    });

    const dataRequest = {
      id_document_type: params.id,
      fields,
      options: dataOptions,
    };

    this.props.addFieldsDocument(dataRequest);

  };

  render() {

    const _self = this;

    return (
      <Layout>
        <MainLayout menuActive={'3'}/>
        <Layout className="site-layout">
          <Header className="header">
            <MainMenu menuActive={'2'}/>
          </Header>
          <Content>
            <div style={{ padding: 20, minHeight: 'calc(100vh - 160px)' }}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <a href="">Inicio</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a href="">Gestión documentaria</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Lista de documentos</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Campos específicos" style={{ width: '100%' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <div style={{ backgroundColor: '#fff', padding: 20 }}>
                          <Form onFinish={this.handleSubmitDocument} layout={'vertical'}>
                            {
                              this.state.fields.map((field, indexField) => {
                                return (
                                  <Row key={indexField}>
                                    <Col xl={{ span: 24 }}>
                                      <Row>
                                        <Col span={8} style={{ paddingRight: 15 }}>
                                          <Form.Item name={`name[${indexField}]`} rules={[{ required: true, message: 'Ingrese un valor' }]} label={`Nombre del campo (${indexField + 1})`}>
                                            <Input name={`name[${indexField}]`} onChange={value => this.handleChangeFieldName(indexField, value)} value={field.value}/>
                                          </Form.Item>
                                        </Col>
                                        <Col span={8} style={{ paddingRight: 15 }}>
                                          <Form.Item name={`type[${indexField}]`} rules={[{ required: true, message: 'Seleccione un tipo' }]} label="Tipo de campo">
                                            <Select name={`type[${indexField}]`} value={field.type} onChange={(type) => _self.handleChangeTypeField(type, indexField)}>
                                              <Select.Option value={1}>Texto</Select.Option>
                                              <Select.Option value={2}>Numérico</Select.Option>
                                              <Select.Option value={3}>Opcion múltipe</Select.Option>
                                              <Select.Option value={4}>Texto extendido</Select.Option>
                                            </Select>
                                          </Form.Item>
                                        </Col>
                                        {
                                          field.type == '3' ?
                                          <Col span={6} style={{ paddingRight: 15 }}>
                                            {
                                              field.options.map(function(option, indexOption) {
                                                return (
                                                  <Row key={indexOption}>
                                                    <Col span={18}>
                                                      <Form.Item rules={[{ required: true, message: 'Ingrese un valor' }]} name={`option[${indexField}][${indexOption}]`} label={`Opción ${indexOption + 1}`}>
                                                        <Input name={`option[${indexField}][${indexOption}]`} value={option.item} onChange={(value) => _self.handleChangeOptionItem(indexField, indexOption, value)}/>
                                                      </Form.Item>
                                                    </Col>
                                                    <Col span={6}>
                                                      <Form.Item label=" ">
                                                        {
                                                          indexOption == 0 ?
                                                          <Button type="default" onClick={() => _self.handleAddItemFieldOptions(indexField)}>+</Button>
                                                          :
                                                          <Button type="default" onClick={() => _self.handleDeleteItemFieldOptions(indexField, indexOption)}>-</Button>
                                                        }
                                                      </Form.Item>
                                                    </Col>
                                                  </Row>
                                                );
                                              })
                                            }
                                          </Col>
                                          : <Col span={6} style={{ paddingRight: 15 }}></Col>
                                        }
                                        <Col span={2} style={{ paddingRight: 15 }}>
                                          {
                                            indexField > 0 ?
                                            <Form.Item label=" ">
                                              <Button type="link" onClick={() => _self.handleDeleteField(indexField)}>Eliminar</Button>
                                            </Form.Item>
                                            : null
                                          }
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                )
                              })
                            }
                            <Row>
                              <Col span={24}>
                                <Form.Item style={{ paddingTop: 20 }}>
                                  <div align="right">
                                    <Button type="default" disabled={this.props.isLoadingAddDocumentFields} onClick={this.handleAddField} style={{ marginRight: 10 }}>Agregar Campo</Button>
                                    <Button htmlType="submit" disabled={this.props.isLoadingAddDocumentFields} loading={this.props.isLoadingAddDocumentFields} type="primary">Guardar</Button>
                                  </div>
                                </Form.Item>
                              </Col>
                            </Row>

                          </Form>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
          <Footer>
            Copyright 2020
          </Footer>
        </Layout>
      </Layout>
    );
  };

};

DocumentTypeFields.propTypes = {
  addFieldsDocument: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoadingAddDocumentFields: makeSelectIsLoadingAddDocumentFields(),
});

function mapDispatchToProps(dispatch) {
  return {
    addFieldsDocument: data => dispatch(addFieldsDocument(data)),
  };
}

const withReducer = injectReducer({ key: 'documentTypeFields', reducer });
const withSaga = injectSaga({ key: 'documentTypeFields', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DocumentTypeFields);
