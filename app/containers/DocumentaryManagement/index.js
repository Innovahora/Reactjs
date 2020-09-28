/**
 *
 * DocumentaryManagement
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDocumentaryManagement from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import MainLayout from '../../components/MainLayout';
import ModalConfirm from '../../components/ModalConfirm';
import {
  Form,
  Layout,
  Table,
  Button,
  Row, Col, Card, Breadcrumb
} from 'antd';
import {
  EditFilled,
  EyeOutlined,
  DeleteFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Header, Content, Sider, Footer } = Layout;

class DocumentaryManagement extends React.Component {

  state = {
    isVisibleConfirmDelete: false,
    menuToggleCollapsed: false
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
        render: () => {
          return (
            <div>
              <Link to="/cargar-documento">
                <Button onClick={this.handleToggleConfirmDelete} type="link"><EyeOutlined /></Button>
              </Link>
              <Button type="link">
                <EditFilled />
              </Button>
              <Button onClick={this.handleToggleConfirmDelete} type="link"><DeleteFilled /></Button>
            </div>
          )
        }
      }
    ];
  };

  handleToggleConfirmDelete = () => {
    this.setState(prevState => ({
      isVisibleConfirmDelete: !prevState.isVisibleConfirmDelete,
    }));
  };

  getDataDocuments = () => {
    return [
      {
        type_document: 'Carta',
        document_code: 'BCA-1',
        codigo: '23456',
        job_title: 'Administración',
      },
      {
        type_document: 'Oficio',
        document_code: 'BCA-2',
        codigo: '23456',
        job_title: 'Administración',
      },
      {
        type_document: 'Factura',
        document_code: 'BCA-3',
        job_title: 'Administración',
      },
    ];
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
                  <Card title="T{ipos de documento" style={{ width: '100%' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <div align="right" style={{ paddingBottom: 20 }}>
                          <Button type="primary">Crear</Button>
                        </div>
                        <Table
                          dataSource={this.getDataDocuments()}
                          columns={this.getColumnsDocuments()}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
            <ModalConfirm
              visible={this.state.isVisibleConfirmDelete}
              title="Confirmación"
              onOk={this.handleToggleConfirmDelete}
              onCancel={this.handleToggleConfirmDelete}
              onClose={this.handleToggleConfirmDelete}
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

DocumentaryManagement.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  DocumentaryManagement: makeSelectDocumentaryManagement(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DocumentaryManagement);
