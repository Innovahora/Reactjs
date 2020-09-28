/**
 *
 * SettingCreateUser
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
  getUser,
  addUser,
  getAreas,
  getProfiles,
} from './actions';
import {
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
import history from '../../utils/history';
import { exist } from '../../utils/functions';
import {
  Spin,
  Layout,
} from 'antd';
const { Header, Content, Sider, Footer } = Layout;

class SettingCreateUser extends React.Component{
  componentDidMount() {
    const { params } = this.props.match;
    if (exist(params.id)) {
      const dataRequest = { id: params.id };
      this.props.getUser(dataRequest);
    }
    this.props.getProfiles();
    this.props.getAreas();
  };

  componentDidUpdate(prevProps) {
    if (
      !this.props.isLoadingAddUser &&
      prevProps.isLoadingAddUser != this.props.isLoadingAddUser
    ) {
      history.goBack();
    }
  };

  handleRegister = dataUser => {
    this.props.addUser(dataUser);
  };

  render() {
    const { profiles, isLoadingProfiles } = this.props;

    return (
      <Layout>
        <Header className="header">
          <MainMenu menuActive={'2'}/>
        </Header>
        <Content>
          <div style={{ padding: 20, minHeight: 'calc(100vh - 160px)' }}>
            {
              this.props.isLoadingUser ?
              <div align="center"><Spin/></div>
              :
              <UserForm
                data={this.props.user}
                loading={this.props.isLoadingAddUser}
                onSubmit={this.handleRegister}
                areas={this.props.areas}
                profiles={this.props.profiles}
                loadingProfiles={this.props.isLoadingProfiles}
                loadingAreas={this.props.isLoadingAreas}
              />
            }
          </div>
        </Content>
        <Footer>
          Copyright 2020
        </Footer>
      </Layout>
    )
  };
}

SettingCreateUser.propTypes = {
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
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

const withReducer = injectReducer({ key: 'settingCreateUser', reducer });
const withSaga = injectSaga({ key: 'settingCreateUser', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingCreateUser);
