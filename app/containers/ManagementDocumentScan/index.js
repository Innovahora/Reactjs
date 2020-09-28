/**
 *
 * ManagementDocumentScan
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
  Form,
  Layout,
  Table,
  Button,
  Image,
  Select,
  Row,
  Col,
  Card,
  Modal,
  Breadcrumb,
} from 'antd';
import {
  makeSelectDocuments,
  makeSelectDocumentTypes,
  makeSelectDocumentBarcode,
  makeSelectIsLoadingDocuments,
  makeSelectIsLoadingDocumentTypes,
  makeSelectIsLoadingAddDocumentBarcode,
  makeSelectIsLoadingDeleteDocumentBarcode,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import ModalForm from '../../components/ModalForm';
import MainLayout from '../../components/MainLayout';
import ModalConfirm from '../../components/ModalConfirm';
import {
  getDocumentTypes,
  addDocumentBarcode,
  getDocumentBarcodes,
  deleteDocumentBarcode,
} from './actions';
import { EditFilled, EyeOutlined, DeleteFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Header, Content, Sider, Footer } = Layout;

class ManagementDocumentScan extends React.Component {
  iframePrint = React.createRef();

  printContent = React.createRef();

  state = {
    isVisibleConfirmDelete: false,
    isVisibleForm: false,
    itemDocument: null,
    documentType: [],
    barcode: null,
    menuToggleCollapsed: false
  };

  componentDidMount() {
    this.props.getDocumentBarcodes();
    this.props.getDocumentTypes();
  }

  componentDidUpdate(prevProps) {
    if (
      !this.props.isLoadingDocumentBarcode &&
      prevProps.isLoadingDocumentBarcode != this.props.isLoadingDocumentBarcode
    ) {
      const { barcode } = this.props;

      this.setState({
        isVisibleForm: true,
        barcode,
      });

      this.props.getDocumentBarcodes();
    }

    if (
      !this.props.isLoadingDeleteDocumentBarcode &&
      prevProps.isLoadingDeleteDocumentBarcode !=
        this.props.isLoadingDeleteDocumentBarcode
    ) {
      this.setState({
        isVisibleConfirmDelete: false,
      });
      this.props.getDocumentBarcodes();
    }
  }

  getColumnsDocuments = () => [
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
        title: 'Estado',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Acciones',
        dataIndex: 'actions',
        key: 'actions',
        width: 200,
        render: (item, itemDocument) => {
          return (
            <div>
              <Link to={`/cargar-documento/${itemDocument.id}`}>
                <Button onClick={this.handleToggleConfirmDelete} type="link"><EyeOutlined /></Button>
              </Link>
              <Button onClick={() => this.handleSelectDelete(itemDocument)} type="link"><DeleteFilled /></Button>
            </div>
          )
        }
      }
    ];

  handleToggleConfirmDelete = () => {
    this.setState(prevState => ({
      isVisibleConfirmDelete: !prevState.isVisibleConfirmDelete,
    }));
  };

  handleSelectDelete = itemDocument => {
    this.setState({ itemDocument, isVisibleConfirmDelete: true });
  };

  getDataDocuments = () => {
    const { documents } = this.props;

    return documents.map((item, index) => ({
        key: item.id_document_barcode,
        id: item.id_document_barcode,
        type_document: item.document_type,
        document_code: item.code,
        status: 'Pendiente',
      }));
  };

  handleGetBarcode = () => {
    const { documentType } = this.state;

    const dataRequest = {
      documentType,
    };

    this.props.addDocumentBarcode(dataRequest);
  };

  handleToggleBarcode = () => {
    this.setState({ isVisibleForm: false });
  };

  handleConfirmDelete = () => {
    const { itemDocument } = this.state;
    this.setState({ isVisibleForm: false });
    const dataRequest = {
      id: itemDocument.id,
    };

    this.props.deleteDocumentBarcode(dataRequest);
  };

  handlePrintBarcode = () => {
    const content = this.printContent.current;
    const pri = this.iframePrint.current.contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
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
                    <Breadcrumb.Item>Escanear documento</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Pendientes de carga" style={{ width: '100%' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <div style={{ backgroundColor: '#fff', padding: 20 }}>
                          <Form
                            layout={'inline'}
                            onFinish={this.handleGetBarcode}
                          >
                            <Form.Item>
                              <Button
                                loading={this.props.isLoadingDocumentBarcode}
                                htmlType="submit"
                                type="primary"
                              >
                                Imprimir código de barras
                              </Button>
                            </Form.Item>
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message: 'Ingrese un tipo de documento',
                                },
                              ]}
                              label="Tipo de documento"
                              name="document_type"
                            >
                              <Select
                                style={{ width: 250 }}
                                name="document_type"
                                value={this.state.documentType}
                                onChange={documentType =>
                                  this.setState({ documentType })
                                }
                                loading={this.props.isLoadingDocumentTypes}
                                placeholder="Seleccionar"
                              >
                                {this.props.documentTypes.map((item, index) => <Select.Option value={item.id_document_type} key={index}>{item.name}</Select.Option>)
                                })}
                              </Select>
                            </Form.Item>
                          </Form>
                        </div>
                        <Table
                          loading={this.props.isLoadingDocuments}
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
              title="Código de barras"
              visible={this.state.isVisibleForm}
              footer={null}
              onOk={() => this.handleToggleBarcode()}
              onClose={() => this.handleToggleBarcode()}
              onCancel={() => this.handleToggleBarcode()}
            >
              <div>
                {this.state.isVisibleForm ? (
                    <div>
                      <div ref={this.printContent} style={{ marginBottom: 15 }}>
                        <div align="center" style={{ display: 'block' }}>
                          <img src={this.state.barcode.image} />
                        </div>
                        <div align="center" style={{ display: 'block', textAlign: 'center' }}>
                          <label><strong>{this.state.barcode.code}</strong></label>
                        </div>
                      </div>
                      <div align="center">
                        <Button onClick={this.handlePrintBarcode} type="primary">
                        Imprimir
                      </Button>
                      </div>
                    </div>)
                    : null
                }
              </div>
            </ModalForm>
            <iframe
              ref={this.iframePrint}
              style={{ height: 0, width: 0, position: 'absolute' }}
            />
            <ModalConfirm
              visible={this.state.isVisibleConfirmDelete}
              title="Confirmación"
              loading={this.props.isLoadingDeleteDocumentBarcode}
              onOk={this.handleConfirmDelete}
              onCancel={this.handleToggleConfirmDelete}
              onClose={this.handleToggleConfirmDelete}
              subtitle="¿Esta seguro de eliminar este registro?"
            />
          </Content>
          <Footer>Copyright 2020</Footer>
        </Layout>
      </Layout>
    );
  }
}

ManagementDocumentScan.propTypes = {
  getDocumentBarcodes: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  barcode: makeSelectDocumentBarcode(),
  documents: makeSelectDocuments(),
  documentTypes: makeSelectDocumentTypes(),
  isLoadingDocuments: makeSelectIsLoadingDocuments(),
  isLoadingDocumentTypes: makeSelectIsLoadingDocumentTypes(),
  isLoadingDocumentBarcode: makeSelectIsLoadingAddDocumentBarcode(),
  isLoadingDeleteDocumentBarcode: makeSelectIsLoadingDeleteDocumentBarcode(),
});

const mapDispatchToProps = dispatch => ({
    getDocumentTypes: data => dispatch(getDocumentTypes(data)),
    addDocumentBarcode: data => dispatch(addDocumentBarcode(data)),
    getDocumentBarcodes: data => dispatch(getDocumentBarcodes(data)),
    deleteDocumentBarcode: data => dispatch(deleteDocumentBarcode(data)),
  })

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'managementDocumentScan', reducer });
const withSaga = injectSaga({ key: 'managementDocumentScan', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagementDocumentScan);
