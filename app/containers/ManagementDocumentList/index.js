/**
 *
 * ManagementDocumentList
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
  makeSelectDocuments,
  makeSelectIsLoadingDocuments,
  makeSelectDocumentTypes,
  makeSelectIsLoadingDocumentTypes,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import MainLayout from '../../components/MainLayout';
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
import {
  getDocuments,
  getDocumentTypes,
} from './actions';
const { Header, Content, Sider, Footer } = Layout;

class ManagementDocumentList extends React.Component {

  state = {
    documentType: [],
    documentName: '',
    menuToggleCollapsed: false
  };

  componentDidMount() {
    this.props.getDocuments();
    this.props.getDocumentTypes();
  };

  handleSearchDocuments = () => {
    const { documentType, documentName } = this.state;

    const dataRequest = {
      documentType,
      documentName,
    };

    this.props.getDocuments(dataRequest);

  };

  getColumnsDocuments = () => {
    return [
      {
        title: 'Tipo de documento',
        dataIndex: 'type_document',
        key: 'type_document',
      },
      {
        title: 'Código de documento',
        dataIndex: 'document_code',
        key: 'document_code',
      },
      {
        title: 'Acciones',
        dataIndex: 'actions',
        key: 'actions',
        width: 100,
        render: () => {
          return (
            <div>
              <Button onClick={this.handleToggleConfirmDelete} type="link">VER</Button>
            </div>
          )
        }
      }
    ];
  };

  getDataDocuments = () => {
    const { documents } = this.props;

    return documents.map((doc, index) => {
      return {
        key: index,
        id: doc.id_document,
        type_document: doc.document_type,
        document_code: doc.code,
      }
    })
  };

  handleMenuToggle = () => {
    const { menuToggleCollapsed } = this.state;
    this.setState({ menuToggleCollapsed: !menuToggleCollapsed });
  };

  render() {
    return (
      <Layout>
        <MainLayout menuActive='3' menuToggle={this.state.menuToggleCollapsed} />
        <Layout className='site-layout'>
          <Header className='header'>
            <MainMenu menuActive='2' menuToggle={this.state.menuToggleCollapsed} onMenuToggle={this.handleMenuToggle} />
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
                  <Card title="Lista de documentos" style={{ width: '100%' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <div style={{ backgroundColor: '#fff', padding: 20 }}>
                          <Form layout={'vertical'}>
                            <Row>
                              <Col xl={{ span: 24 }}>
                                <Row>
                                  <Col span={8} style={{ paddingRight: 15 }}>
                                    <Form.Item label="Tipo de documento">
                                      <Select
                                        allowClear={true}
                                        value={this.state.documentType}
                                        onChange={documentType => this.setState({ documentType })}
                                        loading={this.props.isLoadingDocumentTypes}>
                                        {
                                          this.props.documentTypes.map((documentTypeItem, index) => {
                                            return (
                                              <Select.Option
                                                key={documentTypeItem.id_document_type}
                                                value={documentTypeItem.id_document_type}>
                                                { documentTypeItem.name }
                                              </Select.Option>
                                            )
                                          })
                                        }
                                      </Select>
                                    </Form.Item>
                                    <Form.Item label="Contenido del documento">
                                      <Input name="contenido"/>
                                    </Form.Item>
                                    <Form.Item label="Área Responsable">
                                      <Select>
                                        <Select.Option value="1">Carta</Select.Option>
                                        <Select.Option value="2">Oficio</Select.Option>
                                        <Select.Option value="3">Factura</Select.Option>
                                      </Select>
                                    </Form.Item>
                                  </Col>
                                  <Col span={8} style={{ paddingRight: 15 }}>
                                    <Form.Item label="Código de documento">
                                      <Input onChange={({target}) => this.setState({ documentName: target.value })} name="nombre" value={this.state.documentName}/>
                                    </Form.Item>
                                    <Form.Item label="Fecha">
                                      <DatePicker style={{ width: '100%' }}/>
                                    </Form.Item>
                                  </Col>
                                  <Col span={8}>
                                    <Row>
                                      <Col span={8}>
                                        <Form.Item label="Urgente">
                                          <Checkbox/>
                                        </Form.Item>
                                        <Form.Item label="Pendiente">
                                          <Checkbox/>
                                        </Form.Item>
                                        <Form.Item label="Detallar">
                                          <Checkbox/>
                                        </Form.Item>
                                      </Col>
                                      <Col span={8}>
                                        <Form.Item label="Carta">
                                          <Checkbox/>
                                        </Form.Item>
                                        <Form.Item label="Recibo">
                                          <Checkbox/>
                                        </Form.Item>
                                        <Form.Item label="Etc">
                                          <Checkbox/>
                                        </Form.Item>
                                      </Col>
                                      <Col span={8}>
                                        <Form.Item label="Pendiente">
                                          <Checkbox/>
                                        </Form.Item>
                                        <Form.Item label="Enviado">
                                          <Checkbox/>
                                        </Form.Item>
                                        <Form.Item label="Finalizado">
                                          <Checkbox/>
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                              <Col xl={{ span: 24 }}>
                                <div>
                                  <p>&nbsp;</p>
                                  <h4>Historial</h4>
                                  <Table
                                    bordered={true}
                                    loading={this.props.isLoadingDocuments}
                                    dataSource={this.getDataDocuments()}
                                    columns={this.getColumnsDocuments()}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col span={24}>
                                <Form.Item>
                                  <div align="center">
                                    <Button disabled={this.props.isLoadingDocuments} onClick={this.handleSearchDocuments} type="primary">Buscar</Button>
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
    )
  }
}

ManagementDocumentList.propTypes = {
  getDocuments: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  documents: makeSelectDocuments(),
  isLoadingDocuments: makeSelectIsLoadingDocuments(),
  documentTypes: makeSelectDocumentTypes(),
  isLoadingDocumentTypes: makeSelectIsLoadingDocumentTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDocuments: data => dispatch(getDocuments(data)),
    getDocumentTypes: data => dispatch(getDocumentTypes(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'managementDocumentList', reducer });
const withSaga = injectSaga({ key: 'managementDocumentList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagementDocumentList);
