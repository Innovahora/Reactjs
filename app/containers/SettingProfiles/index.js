/**
 *
 * SettingProfiles
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
  addProfile,
  getModules,
  getProfiles,
  deleteProfile,
} from './actions';
import { Table, Layout, Button, Row, Col, Card, Breadcrumb } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import {
  makeSelectModules,
  makeSelectProfiles,
  makeSelectIsLoadingModules,
  makeSelectIsLoadingProfiles,
  makeSelectIsLoadingAddProfile,
  makeSelectIsLoadingDeleteProfile,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import MainLayout from '../../components/MainLayout';
import ProfileForm from '../../components/ProfileForm';
import ModalForm from '../../components/ModalForm';
import ModalConfirm from '../../components/ModalConfirm';

const { Header, Content, Sider, Footer } = Layout;

class SettingProfiles extends React.Component {
  state = {
    isVisibleConfirmDelete: false,
    profileSelected: null,
    isVisibleForm: false,
    menuToggleCollapsed: false
  };

  componentDidMount() {
    this.props.getProfiles();
    this.props.getModules();
  };

  componentDidUpdate(prevProps) {
    if (
      !this.props.isLoadingAddProfile &&
      prevProps.isLoadingAddProfile != this.props.isLoadingAddProfile
    ) {
      this.setState({
        isVisibleForm: false,
      });
      this.props.getProfiles();
    }

    if (
      !this.props.isLoadingDeleteProfile &&
      prevProps.isLoadingDeleteProfile != this.props.isLoadingDeleteProfile
    ) {
      this.setState({
        isVisibleConfirmDelete: false,
      });
      this.props.getProfiles();
    }
  };

  getColumnsProfiles = () => [
    {
      title: 'Perfil',
      dataIndex: 'profile',
      key: 'profile',
    },
    {
      title: 'Permisos',
      dataIndex: 'permisions',
      key: 'permisions',
      width: 450,
      /*render: (modules) => {
        return modules.map((module, index) => {
          return <span key={index}>{module}</span>
        })
      }*/
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 200,
      render: (item, profile) => (
        <div>
          <Button type="link" onClick={() => this.handleEditProfile(profile)}>
            <EditFilled />
          </Button>
          <Button type="link" onClick={() => this.handleDeleteProfile(profile)}>
            <DeleteFilled />
          </Button>
        </div>
      ),
    },
  ];

  getDataProfiles = () => {
    const { profiles } = this.props;
    return profiles.map(profile => {
      return {
        id: `${profile.id_profile}`,
        key: `${profile.id_profile}`,
        profile: profile.name,
        permisions: profile.modules,
        modules: profile.modules_id,
      }
    });

  };

  handleDeleteProfile = profileSelected => {
    this.setState({
      isVisibleConfirmDelete: true,
      profileSelected,
    });
  };

  handleEditProfile = profileSelected => {
    this.setState({
      isVisibleForm: true,
      profileSelected,
    });
  };

  handleAddProfile = () => {
    this.setState({
      isVisibleForm: true,
      profileSelected: null,
    });
  };

  handleToggleConfirmDelete = () => {
    this.setState(prevState => ({
      isVisibleConfirmDelete: !prevState.isVisibleConfirmDelete,
    }));
  };

  handleRegisterProfile = data => {
    this.props.addProfile(data);
  };

  toggleFormRegister = () => {
    this.setState(prevState => ({
      isVisibleForm: !prevState.isVisibleForm,
    }));
  };

  handleConfirmDelete = () => {
    const { profileSelected } = this.state;
    const dataRequest = {
      id: profileSelected.id,
    };
    this.props.deleteProfile(dataRequest);
  };

  modulesProfile = () => {
    const { modules } = this.props;

    return modules.map(module => {
      return {
        label: module.name,
        value: module.id_module,
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
                  <Card style={{ width: '100%' }}>
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <a href="">Inicio</a>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <a href="">Configuración</a>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Perfiles</Breadcrumb.Item>
                    </Breadcrumb>
                  </Card>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title="Lista de perfiles" style={{ width: '100%' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <div align="right" style={{ paddingBottom: 20 }}>
                          <Button type="primary" onClick={this.handleAddProfile}>Crear</Button>
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <Table
                          loading={this.props.isLoadingProfiles}
                          dataSource={this.getDataProfiles()}
                          columns={this.getColumnsProfiles()}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
            <ModalForm
              title="Añadir Perfil"
              visible={this.state.isVisibleForm}
              onCancel={this.toggleFormRegister}
              footer={null}
              width={600}
            >
              <ProfileForm
                loading={this.props.isLoadingAddProfile}
                visible={this.state.isVisibleForm}
                data={this.state.profileSelected}
                onSubmit={this.handleRegisterProfile}
                onCancel={this.toggleFormRegister}
                modules={this.modulesProfile()}
              />
            </ModalForm>
            <ModalConfirm
              visible={this.state.isVisibleConfirmDelete}
              title="Confirmación"
              loading={this.props.isLoadingDeleteProfile}
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

SettingProfiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  modules: makeSelectModules(),
  profiles: makeSelectProfiles(),
  isLoadingProfiles: makeSelectIsLoadingProfiles(),
  isLoadingAddProfile: makeSelectIsLoadingAddProfile(),
  isLoadingDeleteProfile: makeSelectIsLoadingDeleteProfile(),
  isLoadingModules: makeSelectIsLoadingModules(),
});

const mapDispatchToProps = dispatch => {
  return {
    getModules: data => dispatch(getModules(data)),
    addProfile: data => dispatch(addProfile(data)),
    getProfiles: data => dispatch(getProfiles(data)),
    deleteProfile: data => dispatch(deleteProfile(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'settingProfiles', reducer });
const withSaga = injectSaga({ key: 'settingProfiles', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingProfiles);
