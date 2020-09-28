import React from 'react';
import { Switch, Route } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import Login from '../Login/Loadable';
import Dashboard from '../Dashboard/Loadable';
import DocumentaryManagement from '../DocumentaryManagement/Loadable';
import TreasuryFinance from '../TreasuryFinance/Loadable';
import ManagementDocumentScan from '../ManagementDocumentScan/Loadable';
import ManagementDocumentUpload from '../ManagementDocumentUpload/Loadable';
import ManagementDocumentList from '../ManagementDocumentList/Loadable';
import ManagementDocumentFinder from '../ManagementDocumentFinder/Loadable';
import ManagementTemplates from '../ManagementTemplates/Loadable';
import SettingAreas from '../SettingAreas/Loadable';
import SettingCentersCosts from '../SettingCentersCosts/Loadable';
import SettingProfiles from '../SettingProfiles/Loadable';
import SettingUsers from '../SettingUsers/Loadable';
import SettingCreateUser from '../SettingCreateUser/Loadable';
import SymbolsConversions from '../SymbolsConversions/Loadable';
import DocumentTypes from '../DocumentTypes/Loadable';
import Setting from '../Setting/Loadable';
import DocumentTypeFields from '../DocumentTypeFields/Loadable';
import 'antd/dist/antd.less';
import './theme.less';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route
        exact
        path="/gestion-documentaria"
        component={DocumentaryManagement}
      />
      <Route exact path="/tesoreria-finanzas" component={TreasuryFinance} />
      <Route exact path="/configuracion" component={Setting} />
      <Route
        exact
        path="/escanear-documento"
        component={ManagementDocumentScan}
      />
      <Route
        exact
        path="/cargar-documento"
        component={ManagementDocumentUpload}
      />
      <Route
        exact
        path="/cargar-documento/:id"
        component={ManagementDocumentUpload}
      />
      <Route exact path="/lista-documento" component={ManagementDocumentList} />
      <Route
        exact
        path="/buscador-documento"
        component={ManagementDocumentFinder}
      />
      <Route exact path="/plantillas" component={ManagementTemplates} />
      <Route exact path="/configuracion/areas" component={SettingAreas} />
      <Route
        exact
        path="/configuracion/centros-costo"
        component={SettingCentersCosts}
      />
      <Route exact path="/configuracion/perfiles" component={SettingProfiles} />
      <Route exact path="/configuracion/usuarios" component={SettingUsers} />
      <Route
        exact
        path="/configuracion/usuarios/add"
        component={SettingCreateUser}
      />
      <Route
        exact
        path="/configuracion/usuarios/edit/:id"
        component={SettingCreateUser}
      />
      <Route
        exact
        path="/gestion/simbolos-conversiones"
        component={SymbolsConversions}
      />
      <Route exact path="/gestion/tipos-documentos" component={DocumentTypes} />
      <Route exact path="/gestion/tipos-documentos/config/:id" component={DocumentTypeFields} />
    </Switch>
  </div>
);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withReducer,
  withSaga,
)(App);
