/**
 *
 * SettingCentersCosts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { Table, Layout, Button, Row, Col, Card, Breadcrumb } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import {
  makeSelectCentersCost,
  makeSelectIsLoadingCentersCost,
  makeSelectIsLoadingAddCentersCost,
  makeSelectIsLoadingDeleteCentersCost,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import MainLayout from '../../components/MainLayout';
import ModalConfirm from '../../components/ModalConfirm';
import {
  addCenterCost,
  getCentersCost,
  deleteCenterCost,
} from './actions';

const { Header, Content, Sider, Footer } = Layout;

class SettingCentersCosts extends React.Component {
  state = {
    isVisibleConfirmDelete: false,
    menuToggleCollapsed: false
  };

  componendDidMount() {
    this.props.getCentersCost();
  };

  getColumnsCenterCost = () => [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 200,
      render: () => (
        <div>
          <Button type="link">
            <EditFilled />
          </Button>
          <Button type="link" onClick={this.handleToggleConfirmDelete}>
            <DeleteFilled />
          </Button>
        </div>
      ),
    },
  ];

  handleConfirmDeleteCenterCost = () => {
    
  };

  getDataCenterCost = () => [
    {
      name: 'Centro de costo 1',
      description: 'descripción 1',
    },
    {
      name: 'Centro de costo 2',
      description: 'descripción 2',
    },
    {
      name: 'Centro de costo 3',
      description: 'descripción 3',
    },
    {
      name: 'Centro de costo 4',
      description: 'descripción 4',
    },
  ];

  handleToggleConfirmDelete = () => {
    this.setState(prevState => ({
      isVisibleConfirmDelete: !prevState.isVisibleConfirmDelete,
    }));
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
                    <Breadcrumb.Item>Centros de costo</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card
                    title="Lista de centros de costo"
                    style={{ width: '100%' }}
                  >
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <div align="right" style={{ paddingBottom: 20 }}>
                          <Button type="primary">Crear</Button>
                        </div>
                        <Table
                          dataSource={this.getDataCenterCost()}
                          columns={this.getColumnsCenterCost()}
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
          <Footer>Copyright 2020</Footer>
        </Layout>
      </Layout>
    );
  }
}

SettingCentersCosts.propTypes = {
  getCentersCost: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  centersCost: makeSelectCentersCost(),
  isLoadingCentersCost: makeSelectIsLoadingCentersCost(),
  isLoadingAddCenterCost: makeSelectIsLoadingAddCentersCost(),
  isLoadingDeleteCenterCost: makeSelectIsLoadingDeleteCentersCost(),
});

const mapDispatchToProps = dispatch => {
  return {
    addCenterCost: data => dispatch(addCenterCost(data)),
    deleteCenterCost: data => dispatch(deleteCenterCost(data)),
    getCentersCost: data => dispatch(getCentersCost(data)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'settingCentersCosts', reducer });
const withSaga = injectSaga({ key: 'settingCentersCosts', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingCentersCosts);
