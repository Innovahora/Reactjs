/**
 *
 * ManagementTemplates
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
import { Table, Layout, Button, Row, Col, Input, Select, Card, Breadcrumb } from 'antd';
import { EditFilled, DeleteFilled, SearchOutlined } from '@ant-design/icons';
import makeSelectManagementTemplates from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import MainLayout from '../../components/MainLayout';

const { Header, Content, Sider, Footer } = Layout;

class ManagementTemplates extends React.Component {
  state = {
    menuToggleCollapsed: false
  };

  // export function ManagementTemplates() {
  getColumnsPlantillas = () => [
    {
      title: 'N°',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Nombre de plantilla',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: () => (
        <div>
          <Button type="link">
            <DeleteFilled />
          </Button>
        </div>
      ),
    },
  ];

  getDataPlantillas = () => [
    {
      number: '001',
      name: 'Plantilla 1',
      date: '18/08/2020',
    },
    {
      number: '002',
      name: 'Plantilla 2',
      date: '19/08/2020',
    },
    {
      number: '003',
      name: 'Plantilla 3',
      date: '20/08/2020',
    },
  ];

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
                    <Breadcrumb.Item>Planillas</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={17}>
                  <Card title="Llenar plantilla" style={{ width: '100%' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={16} />
                      <Col span={8}>
                        <Row gutter={[16, 16]}>
                          <Col span={24}>
                            <Input placeholder="Nombre del documento" />
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                          <Col span={24}>
                            <Select
                              placeholder="Área de destino"
                              style={{ width: '100%' }}
                              allowClear
                            >
                              <Option value="jack">Area 1</Option>
                              <Option value="lucy">Area 2</Option>
                            </Select>
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                          <Col span={24}>
                            <Select
                              placeholder="Usuario de destino"
                              style={{ width: '100%' }}
                              allowClear
                            >
                              <Option value="jack">Cristhian Tirado</Option>
                              <Option value="lucy">Consuelo Guzman</Option>
                            </Select>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={7}>
                  <Card title="Lista de plantilla" style={{ width: '100%' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <Row gutter={[16, 16]}>
                          <Col span={24}>
                            <Input
                              placeholder="Buscar plantilla"
                              prefix={<SearchOutlined />}
                            />
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                          <Col span={24}>
                            <Select
                              placeholder="Tipo de plantilla"
                              style={{ width: '100%' }}
                              allowClear
                            >
                              <Option value="jack">Plantilla 1</Option>
                              <Option value="lucy">Plantilla 2</Option>
                            </Select>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
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
                          dataSource={this.getDataPlantillas()}
                          columns={this.getColumnsPlantillas()}
                        />
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

ManagementTemplates.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managementTemplates: makeSelectManagementTemplates(),
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

export default compose(withConnect)(ManagementTemplates);
