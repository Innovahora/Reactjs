/**
 *
 * SettingUsers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  getUsers,
  getUser,
  addUser,
  getAreas,
  getProfiles,
} from './actions';
import {
  Col,
  Row,
  Card,
  Spin,
  Table,
  Layout,
  Button,
  Breadcrumb,
} from 'antd';
import {
  EditFilled,
  DeleteFilled,
} from '@ant-design/icons';
import {
  makeSelectIsLoadingUsers,
  makeSelectUsers,
  makeSelectIsLoadingAreas,
  makeSelectAreas,
  makeSelectIsLoadingAddUser,
  makeSelectIsLoadingProfiles,
  makeSelectProfiles,
  makeSelectIsLoadingUser,
  makeSelectUser,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import UserForm from '../../components/UserForm';
import ModalForm from '../../components/ModalForm';
import MainLayout from '../../components/MainLayout';
import ModalConfirm from '../../components/ModalConfirm';
import history from '../../utils/history';

const { Header, Content, Sider, Footer } = Layout;

class SettingUsers extends React.Component {
  state = {
    isVisibleConfirmDelete: false,
    userSelected: null,
    isVisibleForm: false,
    formRegister: true,
    menuToggleCollapsed: false
  };

  componentDidMount() {
    this.props.getUsers();
    this.props.getProfiles();
    this.props.getAreas();
  };

  componentDidUpdate(prevProps) {
    if (
      !this.props.isLoadingAddUser &&
      prevProps.isLoadingAddUser != this.props.isLoadingAddUser
    ) {
      this.setState({ isVisibleForm: false });
    }
  };

  getColumnsUsers = () => [
    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Área',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Última autenticación',
      dataIndex: 'last_auth',
      key: 'last_auth',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 200,
      render: (data, user) => (
        <div>
          <Button type="link" onClick={() => this.handleEditUser(user)}>
            <EditFilled />
          </Button>
          <Button type="link" onClick={this.handleToggleConfirmDelete}>
            <DeleteFilled />
          </Button>
        </div>
      ),
    },
  ];

  getDataUsers = () => {
    const { users } = this.props;
    return users.map(user => {
      return {
        key: `${user.id}`,
        id: user.id,
        username: user.name,
        email: user.email,
        area: 'Administración',
        last_auth: '2020/01/01',
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        monther_lastname: user.monther_lastname,
        charge: user.charge,
        id_area: user.id_area,
        id_profile: user.id_profile,
      }
    })
  };

  handleToggleConfirmDelete = () => {
    this.setState(prevState => ({
      isVisibleConfirmDelete: !prevState.isVisibleConfirmDelete,
    }));
  };

  handleRegister = data => {
    this.props.addUser(data);
  };

  handleToggleFormRegister = isVisibleForm => {
    this.setState({ isVisibleForm });
  };

  handleEditUser = (userSelected) => {
    this.setState({
      userSelected,
      isVisibleForm: true,
    });
  };

  handleRegisterUser = () => {
    this.setState({
      userSelected: null,
      isVisibleForm: true,
    });
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
                    <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Lista de usuarios" style={{ width: '100%' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <div align="right" style={{ paddingBottom: 20 }}>
                          <Button type="primary" onClick={this.handleRegisterUser}>Crear</Button>
                        </div>
                        <Table
                          loading={this.props.isLoadingUsers}
                          dataSource={this.getDataUsers()}
                          columns={this.getColumnsUsers()}
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
            <ModalForm
              title="Añadir Usuario"
              visible={this.state.isVisibleForm}
              onCancel={() => this.handleToggleFormRegister(false)}
              footer={null}
              width={800}
            >
              <UserForm
                visible={this.state.isVisibleForm}
                data={this.state.userSelected}
                typeForm={this.state.formRegister}
                loading={this.props.isLoadingAddUser}
                onCancel={() => this.handleToggleFormRegister(false)}
                onSubmit={this.handleRegister}
                areas={this.props.areas}
                profiles={this.props.profiles}
                loadingProfiles={this.props.isLoadingProfiles}
                loadingAreas={this.props.isLoadingAreas}
              />
            </ModalForm>
          </Content>
          <Footer>Copyright 2020</Footer>
        </Layout>
      </Layout>
    );
  }
}

SettingUsers.propTypes = {
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoadingUsers: makeSelectIsLoadingUsers(),
  users: makeSelectUsers(),
  isLoadingAddUser: makeSelectIsLoadingAddUser(),
  isLoadingAreas: makeSelectIsLoadingAreas(),
  areas: makeSelectAreas(),
  isLoadingProfiles: makeSelectIsLoadingProfiles(),
  profiles: makeSelectProfiles(),
  isLoadingUser: makeSelectIsLoadingUser(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUsers: data => dispatch(getUsers(data)),
    getUser: data => dispatch(getUser(data)),
    addUser: data => dispatch(addUser(data)),
    getAreas: data => dispatch(getAreas(data)),
    getProfiles: data => dispatch(getProfiles(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'settingUsers', reducer });
const withSaga = injectSaga({ key: 'settingUsers', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingUsers);
