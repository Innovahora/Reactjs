/**
 *
 * ManagementDocumentUpload
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
  Row,
  Col,
  Card,
  Form,
  Table,
  Input,
  Select,
  Upload,
  Button,
  Layout,
  DatePicker,
  Breadcrumb,
} from 'antd';
import { EditFilled, DeleteFilled, PlusOutlined } from '@ant-design/icons';
import {
  makeSelectDocumentTypes,
  makeSelectIsLoadingDocumentTypes,
  makeSelectIsLoadingAreas,
  makeSelectAreas,
  makeSelectIsLoadingAddDocument,
  makeSelectIsLoadingUsers,
  makeSelectUsers,
  makeSelectIsLoadingDocumentBarcode,
  makeSelectDocumentBarcode,
  makeSelectIsLoadingDocumentFields,
  makeSelectDocumentFields,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import MainLayout from '../../components/MainLayout';
import ModalForm from '../../components/ModalForm';
import ModalConfirm from '../../components/ModalConfirm';
import DocumentUploadForm from '../../components/DocumentUploadForm';
import {
  getAreas,
  getUsers,
  addDocument,
  getDocumentTypes,
  getDocumentFields,
  getDocumentBarcode,
} from './actions';
const { Header, Content, Sider, Footer } = Layout;

class ManagementDocumentUpload extends React.Component {
  state = {
    isVisibleConfirmDelete: false,
    isVisibleSender: false,
    isVisibleConfirmSave: false,
    dataDocument: null,
    menuToggleCollapsed: false
  };

  componentDidMount() {
    this.props.getDocumentTypes();
    this.props.getAreas();
    this.props.getDocumentFields();

    const { params } = this.props.match;

    if (parseInt(params.id, 10) > 0) {
      const dataRequest = { id: params.id };
      this.props.getDocumentBarcode(dataRequest);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !this.props.isLoadingAddDocument &&
      prevProps.isLoadingAddDocument != this.props.isLoadingAddDocument
    ) {
      this.setState({ isVisibleConfirmSave: false });
    }
  };

  handleToggleConfirmDelete = () => {
    this.setState(prevState => ({
      isVisibleConfirmDelete: !prevState.isVisibleConfirmDelete,
    }));
  };

  handleSaveDocument = () => {
    const { dataDocument } = this.state;
    this.props.addDocument(dataDocument);
  };

  handleRegisterDocument = dataDocument => {
    this.setState({ dataDocument, isVisibleConfirmSave: true });
  };

  handleSearchUser = search => {
    const dataRequest = {
      search,
    };
    this.props.getUsers(dataRequest);
  };

  handleSearchSender = data => {
    this.setState({
      isVisibleSender: true,
    });
  };

  toggleFormSender = () => {
    this.setState(prevState => ({
      isVisibleSender: !prevState.isVisibleSender,
    }));
  };

  handleMenuToggle = () => {
    const { menuToggleCollapsed } = this.state;
    this.setState({ menuToggleCollapsed: !menuToggleCollapsed });
  };

  render() {
    return (
      <Layout>
        <MainLayout menuActive="3" menuToggle={this.state.menuToggleCollapsed} />
        <Layout className="site-layout">
          <Header className="header">
            <MainMenu menuActive="2" menuToggle={this.state.menuToggleCollapsed} onMenuToggle={this.handleMenuToggle} />
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
                    <Breadcrumb.Item>Cargar documento</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Cargar documento" style={{ width: '100%' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <div style={{ backgroundColor: '#fff', padding: 20 }}>
                          <DocumentUploadForm
                            barcode={this.props.documentBarcode}
                            loading={this.props.isLoadingAddDocument}
                            documentTypes={this.props.documentTypes}
                            areas={this.props.areas}
                            loadingFields={this.props.isLoadingDocumentFields}
                            fields={this.props.documentFields}
                            onSearchSender={this.handleSearchSender}
                            loadingDocumentTypes={
                              this.props.isLoadingDocumentTypes
                            }
                            loadingAreas={this.props.isLoadingAreas}
                            isLoadingUsers={this.props.isLoadingUsers}
                            users={this.props.users}
                            searchUser={this.handleSearchUser}
                            onSubmit={this.handleRegisterDocument}
                          />
                          <ModalConfirm
                            title={"Confirmación"}
                            visible={this.state.isVisibleConfirmSave}
                            onCancel={() => this.setState({ isVisibleConfirmSave: false })}
                            onOk={this.handleSaveDocument}
                            subtitle={
                              <div>
                                {
                                  this.state.dataDocument ?
                                  <div>
                                    ¿Desea guardar el documento { this.state.dataDocument.data.code } para el usuario { this.state.dataDocument.data.user } del área { this.state.dataDocument.data.area }. 
                                  </div>
                                  : null
                                }
                              </div>
                            }
                          />
                          <ModalForm
                            title={'Remitente'}
                            visible={this.state.isVisibleSender}
                            onClose={this.hande}
                            onCancel={this.toggleFormSender}
                            footer={null}
                            onOk={this.toggleFormSender}
                          >
                            <Form  layout={'vertical'}>
                              <Form.Item
                                name={`documentType`}
                                label={'Tipo de documento'}
                                rules={[{ required: true, message: 'Seleccione tipo de documento' }]}>
                                <Select
                                  name={`documentType`}
                                >
                                  {
                                    this.props.documentTypes.map((type, index) => {
                                      return (
                                        <Select.Option key={index}>{type.name}</Select.Option>
                                      )
                                    })
                                  }
                                </Select>
                              </Form.Item>
                              <Form.Item
                                name={`documentNumber`}
                                label={'Número de documento'}
                                rules={[{ required: true, message: 'Ingrese un número de documento' }]}>
                                <Input
                                  name={`documentNumber`}
                                />
                              </Form.Item>
                              <Form.Item
                                name={`documentName`}
                                label={'Nombre y apellidos'}
                                rules={[{ required: true, message: 'Ingrese los nombres y apellidos' }]}>
                                <Input
                                  name={`documentName`}
                                />
                              </Form.Item>
                              <Form.Item
                                name={`documentAdress`}
                                label={'Dirección'}
                                rules={[{ required: true, message: 'Ingrese la dirección' }]}>
                                <Input
                                  name={`documentAdress`}
                                />
                              </Form.Item>
                              <Form.Item
                                name={`documentPhone`}
                                label={'Teléfono'}
                                rules={[{ required: true, message: 'Ingrese el teléfono' }]}>
                                <Input
                                  name={`documentPhone`}
                                />
                              </Form.Item>
                              <Form.Item
                                name={`email`}
                                label={'Correo electrónico'}
                                rules={[{ required: true, message: 'Ingrese el correo electrónico' }]}>
                                <Input
                                  name={`email`}
                                />
                              </Form.Item>
                              <Form.Item
                                label=" ">
                                <Button htmlType="submit" onClick={this.toggleFormSender} type="primary">Guardar</Button>
                              </Form.Item>
                            </Form>
                          </ModalForm>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
          <Footer>Copyright 2020</Footer>
        </Layout>
      </Layout>
    );
  }
}

ManagementDocumentUpload.propTypes = {
  getDocumentTypes: PropTypes.func.isRequired,
  getAreas: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  documentTypes: makeSelectDocumentTypes(),
  isLoadingDocumentTypes: makeSelectIsLoadingDocumentTypes(),
  isLoadingAreas: makeSelectIsLoadingAreas(),
  isLoadingAddDocument: makeSelectIsLoadingAddDocument(),
  areas: makeSelectAreas(),
  isLoadingUsers: makeSelectIsLoadingUsers(),
  users: makeSelectUsers(),
  isLoadingDocumentBarcode: makeSelectIsLoadingDocumentBarcode(),
  documentBarcode: makeSelectDocumentBarcode(),
  isLoadingDocumentFields: makeSelectIsLoadingDocumentFields(),
  documentFields: makeSelectDocumentFields(),
});

const mapDispatchToProps = dispatch => ({
  getDocumentBarcode: data => dispatch(getDocumentBarcode(data)),
  getDocumentTypes: data => dispatch(getDocumentTypes(data)),
  addDocument: data => dispatch(addDocument(data)),
  getAreas: data => dispatch(getAreas(data)),
  getUsers: data => dispatch(getUsers(data)),
  getDocumentFields: data => dispatch(getDocumentFields(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'managementDocumentUpload', reducer });
const withSaga = injectSaga({ key: 'managementDocumentUpload', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagementDocumentUpload);
