/**
 *
 * SymbolsConversions
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
  Row,
  Col,
  Card,
  Radio,
  Breadcrumb,
} from 'antd';
import { EditFilled, EyeOutlined, DeleteFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import MainMenu from '../../components/MainMenu';
import ModalForm from '../../components/ModalForm';
import MainLayout from '../../components/MainLayout';

import { makeSelectIsLoadingUpdateSettings } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { updateSettings } from './actions';
const { Header, Content, Sider, Footer } = Layout;

class SymbolsConversions extends React.Component {
  state = {
    value: 1,
    formatDate: 1,
    menuToggleCollapsed: false
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  onChangeFormatDate = e => {
    this.setState({
      formatDate: e.target.value,
    });
  };

  handleUpdate = () => {
    this.props.updateSettings();
  };

  handleMenuToggle = () => {
    const { menuToggleCollapsed } = this.state;
    this.setState({ menuToggleCollapsed: !menuToggleCollapsed });
  };

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

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
                    <Breadcrumb.Item>Simbolos y conversiones</Breadcrumb.Item>
                  </Breadcrumb>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card
                    title="Simbolos y conversiones"
                    style={{ width: '100%' }}
                  >
                    <Form layout="vertical" onFinish={this.handleUpdate}>
                      <h4>Separador de miles</h4>
                      <Radio.Group
                        onChange={this.onChange}
                        value={this.state.value}
                      >
                        <Radio style={radioStyle} value={1}>
                          Coma
                        </Radio>
                        <Radio style={radioStyle} value={2}>
                          Punto
                        </Radio>
                      </Radio.Group>
                      <br />
                      <h4>Formato de fecha</h4>
                      <Radio.Group
                        onChange={this.onChangeFormatDate}
                        value={this.state.formatDate}
                      >
                        <Radio style={radioStyle} value={1}>
                          DD/MM/AAAA
                        </Radio>
                        <Radio style={radioStyle} value={2}>
                          DD-MM-AAAA
                        </Radio>
                        <Radio style={radioStyle} value={3}>
                          AAAA/MM/DD
                        </Radio>
                        <Radio style={radioStyle} value={4}>
                          AAAA-MM-DD
                        </Radio>
                      </Radio.Group>
                      <p>&nbsp;</p>
                      <Form.Item>
                        <div>
                          <Button
                            loading={this.props.isLoadingUpdateSettings}
                            htmlType="submit"
                            type="primary"
                          >
                            {' '}
                            Guardar{' '}
                          </Button>
                        </div>
                      </Form.Item>
                    </Form>
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

SymbolsConversions.propTypes = {
  updateSettings: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoadingUpdateSettings: makeSelectIsLoadingUpdateSettings(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateSettings: data => dispatch(updateSettings(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'symbolsConversions', reducer });
const withSaga = injectSaga({ key: 'symbolsConversions', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SymbolsConversions);
