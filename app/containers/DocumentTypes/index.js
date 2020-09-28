/**
 *
 * DocumentTypes
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
  makeSelectDocumentTypes,
  makeSelectIsLoadingDocumentTypes,
  makeSelectIsLoadingAddDocumentType,
  makeSelectIsLoadingDeleteDocumentType,
} from './selectors';

import reducer from './reducer';

import saga from './saga';
import MainMenu from '../../components/MainMenu';
import ModalForm from '../../components/ModalForm';
import MainLayout from '../../components/MainLayout';
import ModalConfirm from '../../components/ModalConfirm';
import DocumentTypeForm from '../../components/DocumentTypeForm';

import {
  addDocumentType,
  getDocumentTypes,
  deleteDocumentType,
} from './actions';

import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Layout,
  Button,
  Breadcrumb,
} from 'antd';

import {
  EditFilled,
  EyeOutlined,
  DeleteFilled,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';

const { Header, Content, Sider, Footer } = Layout;

class DocumentTypes extends React.Component {

  state = {
    isVisibleConfirmDelete: false,
    isVisibleForm: false,
    itemDocumentType: null,
    menuToggleCollapsed: false
  };

  componentDidMount() {
    this.props.getDocumentTypes();
  };

  componentDidUpdate(prevProps) {
    if (
      !this.props.isLoadingAddDocumentType &&
      prevProps.isLoadingAddDocumentType != this.props.isLoadingAddDocumentType
    ) {
      this.setState({
        isVisibleForm: false,
      });
      this.props.getDocumentTypes();
    }

    if (
      !this.props.isLoadingDeleteDocumentType &&
      prevProps.isLoadingDeleteDocumentType != this.props.isLoadingDeleteDocumentType
    ) {
      this.setState({
        isVisibleConfirmDelete: false,
      });
      this.props.getDocumentTypes();
    }
  };

  getColumnsDocuments = () => {
    return [
      {
        title: 'Tipo de documento',
        dataIndex: 'type_document',
        key: 'type_document',
      },
      {
        title: 'Código',
        dataIndex: 'document_code',
        key: 'document_code',
      },
      {
        title: 'Acciones',
        dataIndex: 'actions',
        key: 'actions',
        width: 200,
        render: (option, documentType) => {
          return (
            <div>
              <Link to={`/gestion/tipos-documentos/config/${documentType.id}`}>
                <Button type="link">
                  <EyeOutlined />
                </Button>
              </Link>
              <Button type="link">
                <EditFilled />
              </Button>
              <Button onClick={() => this.handleConfirmDelete(documentType)} type="link">
                <DeleteFilled />
              </Button>
            </div>
          )
        }
      }
    ];
  };

  handleConfirmDelete = (itemDocumentType) => {
    this.setState({
      itemDocumentType,
      isVisibleConfirmDelete: true,
    });
  };

  handleToggleConfirmDelete = () => {
    this.setState(prevState => ({
      isVisibleConfirmDelete: !prevState.isVisibleConfirmDelete,
    }));
  };

  getDataDocuments = () => {
    const { documentTypes } = this.props;
    return documentTypes.map(item => {
      return {
        key: item.id_document_type,
        id: item.id_document_type,
        document_code: item.code,
        type_document: item.name,
      }
    });
  };

  handleToggleFormRegister = () => {
    this.setState(prevState => ({
      isVisibleForm: !prevState.isVisibleForm,
    }));
  };

  handleRegisterDocumentType = data => {
    this.setState({
      isVisibleForm: false,
    });
    this.props.addDocumentType(data);
  };

  handleDeleteDocumentType = () => {
    const { itemDocumentType } = this.state;
    const dataRequest = {
      id: itemDocumentType.id,
    };
    this.props.deleteDocumentType(dataRequest);
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
                      <a href="">Configuración</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <a href="">Gestión documentaria</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Típos de documento</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Tipos de documento" style={{ width: '100%' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <div align="right" style={{ paddingBottom: 20 }}>
                          <Button
                            onClick={this.handleToggleFormRegister}
                            type="primary"
                          >
                            Crear
                          </Button>
                        </div>
                        <Table
                          loading={this.props.isLoadingDocumentTypes}
                          dataSource={this.getDataDocuments()}
                          columns={this.getColumnsDocuments()}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
            <ModalForm
              title="Añadir tipo de documento"
              visible={this.state.isVisibleForm}
              onCancel={this.handleToggleFormRegister}
              footer={null}
            >
              {
                this.state.isVisibleForm ? 
                  <DocumentTypeForm
                    data={this.state.itemDocumentType}
                    onCancel={this.handleToggleFormRegister}
                    loading={this.props.isLoadingAddDocumentType}
                    onOk={this.handleRegisterDocumentType}
                  />
                : null
              }
            </ModalForm>
            <ModalConfirm
              visible={this.state.isVisibleConfirmDelete}
              title="Confirmación"
              onOk={this.handleDeleteDocumentType}
              onCancel={this.handleToggleConfirmDelete}
              onClose={this.handleToggleConfirmDelete}
              loading={this.props.isLoadingDeleteDocumentType}
              subtitle="¿Esta seguro de eliminar este registro?"
            />
          </Content>
          <Footer>
            Copyright 2020
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

DocumentTypes.propTypes = {
  getDocumentTypes: PropTypes.func.isRequired,
  addDocumentType: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  documentTypes: makeSelectDocumentTypes(),
  isLoadingDocumentTypes: makeSelectIsLoadingDocumentTypes(),
  isLoadingAddDocumentType: makeSelectIsLoadingAddDocumentType(),
  isLoadingDeleteDocumentType: makeSelectIsLoadingDeleteDocumentType(),
});

const mapDispatchToProps = dispatch => {
  return {
    addDocumentType: data => dispatch(addDocumentType(data)),
    getDocumentTypes: data => dispatch(getDocumentTypes(data)),
    deleteDocumentType: data => dispatch(deleteDocumentType(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'documentTypes', reducer });
const withSaga = injectSaga({ key: 'documentTypes', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DocumentTypes);
