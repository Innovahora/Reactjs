/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  UnorderedListOutlined,
  OrderedListOutlined
} from '@ant-design/icons';
/* import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer'; */
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import MainLayout from '../../components/MainLayout';
import {
  Layout, Row, Col, Card, Breadcrumb, Button
} from 'antd';

import { Link } from 'react-router-dom';

const { Header, Content, Sider, Footer } = Layout;
const { Meta } = Card;

// export function Dashboard() {
class Dashboard extends React.Component {
  state = {
    menuToggleCollapsed: false
  };

  /* useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga }); */

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
                  <Card title='Gestión Documentaria' style={{ width: '100%' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={4}>
                        <Link to='/escanear-documento'>
                          <Card
                            hoverable
                            style={{ width: 150, margin: 'auto' }}
                            cover={<UnorderedListOutlined style={{ fontSize: '50px', textAlign: 'center' }} />}
                          >
                            <Meta description='Escanear Documento' style={{ fontSize: '14px', fontWeight: 600, textAlign: 'center' }} />
                          </Card>
                        </Link>
                      </Col>
                      <Col span={4}>
                        <Link to='/cargar-documento'>
                          <Card
                            hoverable
                            style={{ width: 150, margin: 'auto' }}
                            cover={<UnorderedListOutlined style={{ fontSize: '50px', textAlign: 'center' }} />}
                          >
                            <Meta description='Cargar Documento' style={{ fontSize: '14px', fontWeight: 600, textAlign: 'center' }} />
                          </Card>
                        </Link>
                      </Col>
                      <Col span={4}>
                        <Link to='/lista-documento'>
                          <Card
                            hoverable
                            style={{ width: 150, margin: 'auto' }}
                            cover={<UnorderedListOutlined style={{ fontSize: '50px', textAlign: 'center' }} />}
                          >
                            <Meta description='Lista de Documentos' style={{ fontSize: '14px', fontWeight: 600, textAlign: 'center' }} />
                          </Card>
                        </Link>
                      </Col>
                      <Col span={4}>
                        <Link to='/buscador-documento'>
                          <Card
                            hoverable
                            style={{ width: 150, margin: 'auto' }}
                            cover={<UnorderedListOutlined style={{ fontSize: '50px', textAlign: 'center' }} />}
                          >
                            <Meta description='Buscar Documentos' style={{ fontSize: '14px', fontWeight: 600, textAlign: 'center' }} />
                          </Card>
                        </Link>
                      </Col>
                      <Col span={4}>
                        <Link to='/plantillas'>
                          <Card
                            hoverable
                            style={{ width: 150, margin: 'auto' }}
                            cover={<UnorderedListOutlined style={{ fontSize: '50px', textAlign: 'center' }} />}
                          >
                            <Meta description='Plantillas' style={{ fontSize: '14px', fontWeight: 600, textAlign: 'center' }} />
                          </Card>
                        </Link>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title='Tesorería y Finanzas' style={{ width: '100%' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card title='Configuración' style={{ width: '100%' }}>
                    <Row gutter={[8, 8]}>
                      <Col span={4}>
                        <Link to='/configuracion/usuarios'>
                          <Card
                            hoverable
                            style={{ width: 150, margin: 'auto' }}
                            cover={<OrderedListOutlined style={{ fontSize: '50px', textAlign: 'center' }} />}
                          >
                            <Meta description='Usuarios' style={{ fontSize: '14px', fontWeight: 600, textAlign: 'center' }} />
                          </Card>
                        </Link>
                      </Col>
                      <Col span={4}>
                        <Link to='/configuracion/areas'>
                          <Card
                            hoverable
                            style={{ width: 150, margin: 'auto' }}
                            cover={<OrderedListOutlined style={{ fontSize: '50px', textAlign: 'center' }} />}
                          >
                            <Meta description='Áreas' style={{ fontSize: '14px', fontWeight: 600, textAlign: 'center' }} />
                          </Card>
                        </Link>
                      </Col>
                      <Col span={4}>
                        <Link to='/configuracion/centros-costo'>
                          <Card
                            hoverable
                            style={{ width: 150, margin: 'auto' }}
                            cover={<OrderedListOutlined style={{ fontSize: '50px', textAlign: 'center' }} />}
                          >
                            <Meta description='Centros de Costos' style={{ fontSize: '14px', fontWeight: 600, textAlign: 'center' }} />
                          </Card>
                        </Link>
                      </Col>
                      <Col span={4}>
                        <Link to='/configuracion/perfiles'>
                          <Card
                            hoverable
                            style={{ width: 150, margin: 'auto' }}
                            cover={<OrderedListOutlined style={{ fontSize: '50px', textAlign: 'center' }} />}
                          >
                            <Meta description='Perfiles' style={{ fontSize: '14px', fontWeight: 600, textAlign: 'center' }} />
                          </Card>
                        </Link>
                      </Col>
                      <Col span={4}>
                        <Link to='/'>
                          <Card
                            hoverable
                            style={{ width: 150, margin: 'auto' }}
                            cover={<OrderedListOutlined style={{ fontSize: '50px', textAlign: 'center' }} />}
                          >
                            <Meta description='Gestión Documentaria' style={{ fontSize: '14px', fontWeight: 600, textAlign: 'center' }} />
                          </Card>
                        </Link>
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
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
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

export default compose(withConnect)(Dashboard);
