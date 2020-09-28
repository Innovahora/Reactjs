/**
 *
 * SettingAreas
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
import {
  addArea,
  getAreas,
} from './actions';
import { Table, Layout, Button, Row, Col, Card, Breadcrumb } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import {
  makeSelectIsLoadingAddArea,
  makeSelectIsLoadingAreas,
  makeSelectIsLoadingUsers,
  makeSelectUsers,
  makeSelectAreas,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import MainLayout from '../../components/MainLayout';
import ModalForm from '../../components/ModalForm';
import AreaForm from '../../components/AreaForm';
import ModalConfirm from '../../components/ModalConfirm';
import history from '../../utils/history';

import {
  getUsers,
} from './actions';

const { Header, Content, Sider, Footer } = Layout;

class SettingAreas extends React.Component {
  state = {
    itemArea: null,
    isVisibleForm: false,
    isVisibleConfirmDelete: false,
    menuToggleCollapsed: false
  };

  componentDidMount() {
    this.props.getAreas();
  };

  componentDidUpdate(prevProps) {
    if (
      !this.props.isLoadingAddArea &&
      prevProps.isLoadingAddArea != this.props.isLoadingAddArea
    ) {
      this.setState({
        isVisibleForm: false,
      });
      this.props.getAreas();
    }
  };

  handleEditArea = itemArea => {
    this.setState({
      itemArea,
      isVisibleForm: true,
    });
  };

  getColumnsAreas = () => [
    {
      title: 'Área',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Representante',
      dataIndex: 'representant',
      key: 'representant',
    },
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
    },
    {
      title: 'Puestos',
      dataIndex: 'job_title',
      key: 'job_title',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 200,
      render: (area, dataArea) => (
        <div>
          <Button type="link" onClick={() => this.handleEditArea(dataArea)}>
            <EditFilled />
          </Button>
          <Button onClick={this.handleToggleConfirmDelete} type="link">
            <DeleteFilled />
          </Button>
        </div>
      ),
    },
  ];

  handleToggleConfirmDelete = () => {
    this.setState(prevState => ({
      isVisibleConfirmDelete: !prevState.isVisibleConfirmDelete,
    }));
  };

  getDataAreas = () => {
    const { areas } = this.props;
    return areas.map(area => {
      return {
        key: `${area.id_area}`,
        id: area.id_area,
        area: area.name,
        representant: area.representative,
        codigo: area.code,
        job_title: '',
      }
    });
  };

  handleToggleFormRegister = () => {
    this.setState(prevState => ({
      isVisibleForm: !prevState.isVisibleForm,
      itemArea: null,
    }));
  };

  handleRegister = () => {
    this.setState(prevState => ({
      isVisibleForm: !prevState.isVisibleForm,
    }));
  };

  handleRegisterArea = dataArea => {
    this.props.addArea(dataArea);
  };

  handleSearchUser = search => {
    const dataRequest = {
      search,
    };
    this.props.getUsers(dataRequest);
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
                    <Breadcrumb.Item>Áreas</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Lista de areas" style={{ width: '100%' }}>
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
                          loading={this.props.isLoadingAreas}
                          dataSource={this.getDataAreas()}
                          columns={this.getColumnsAreas()}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
            <ModalForm
              title="Añadir Área"
              visible={this.state.isVisibleForm}
              onOk={this.handleRegister}
              onCancel={this.handleToggleFormRegister}
              footer={null}
            >
              {
                this.state.isVisibleForm ? 
                  <AreaForm
                    data={this.state.itemArea}
                    searchUser={this.handleSearchUser}
                    users={this.props.users}
                    isLoadingUsers={this.props.isLoadingUsers}
                    onCancel={this.handleToggleFormRegister}
                    loading={this.props.isLoadingAddArea}
                    onOk={this.handleRegisterArea}
                  />
                : null
              }
            </ModalForm>
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

SettingAreas.propTypes = {
  getAreas: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoadingAreas: makeSelectIsLoadingAreas(),
  isLoadingAddArea: makeSelectIsLoadingAddArea(),
  isLoadingUsers: makeSelectIsLoadingUsers(),
  users: makeSelectUsers(),
  areas: makeSelectAreas(),
});

function mapDispatchToProps(dispatch) {
  return {
    addArea: data => dispatch(addArea(data)),
    getAreas: data => dispatch(getAreas(data)),
    getUsers: data => dispatch(getUsers(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'settingAreas', reducer });
const withSaga = injectSaga({ key: 'settingAreas', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingAreas);
