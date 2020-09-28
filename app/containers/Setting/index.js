/**
 *
 * Setting
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
import makeSelectSetting from './selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import {
  Layout,
} from 'antd';
const { Header, Content, Sider, Footer } = Layout;

class Setting extends React.Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <MainMenu menuActive={'3'}/>
        </Header>
        <Content>
          <div style={{ padding: '50px 0 20px 0', minHeight: 'calc(100vh - 160px)' }}>

          </div>
        </Content>
        <Footer>
          Copyright 2020
        </Footer>
      </Layout>
    );
  }
}

Setting.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  setting: makeSelectSetting(),
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

export default compose(withConnect)(Setting);
