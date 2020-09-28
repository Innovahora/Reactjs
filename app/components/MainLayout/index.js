/**
 *
 * MainLayout
 *
 */

import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import {
	DollarCircleOutlined, 
	AppstoreOutlined, 
	SettingOutlined
} from '@ant-design/icons';
import { closeSesion } from '../../containers/App/actions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../images/logo_directores.png';

import './index.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

const MainLayout = (props) => {
	return (
	    <React.Fragment>
			<Sider trigger={null} collapsible collapsed={props.menuToggle}>
				<div className="logo" style={{backgroundSize: props.menuToggle ? 'auto 40px' : 'auto 62px'}} />
          	 	<Menu
		          	theme='dark'
		          	defaultOpenKeys={['sub1']}
		          	selectedKeys={[1]}
		          	mode='inline'
		        >
		        	<Menu.Item key='0' className='menu-logo' style={{display: 'none'}}>
						<Link to='/dashboard'>
							<img src={logo} height={props.menuToggle ? '40' : '62'} alt='Asociación de AFP' />
						</Link>
					</Menu.Item>
		          	<SubMenu key='sub1' icon={<AppstoreOutlined />} title='Gestión Documentaria'>
			            <Menu.Item key='1'>
			            	<Link to='/escanear-documento'>
					        	Escanear documento
					      	</Link>
			            </Menu.Item>
			            <Menu.Item key='2'>
			            	<Link to='/cargar-documento'>
					       		Cargar Documento
					      	</Link>
			            </Menu.Item>
			            <Menu.Item key='3'>
				            <Link to='/lista-documento'>
					    		Lista de Documentos
					      	</Link>
			            </Menu.Item>
			            <Menu.Item key='4'>
			            	<Link to='/buscador-documento'>
								Buscar Documentos
							</Link>
			            </Menu.Item>
			            <Menu.Item key='14'>
			            	<Link to='/plantillas'>
								Plantillas
							</Link>
			            </Menu.Item>
		          	</SubMenu>
		          	<SubMenu key='sub2' icon={<DollarCircleOutlined />} title='Tesorería y Finanzas'>
			            <Menu.Item key='5'>Opción 1</Menu.Item>
			            <Menu.Item key='6'>Opción 2</Menu.Item>
		          	</SubMenu>
		          	<SubMenu key='sub3' icon={<SettingOutlined />} title='Configuración'>
			            <SubMenu key='sub3.1' title='General'>
			              	<Menu.Item key='7'>
			              		<Link to='/configuracion/usuarios'>
						       		Usuarios
						      	</Link>
			              	</Menu.Item>
			              	<Menu.Item key='8'>
			              		<Link to='/configuracion/areas'>
						        	Áreas
						      	</Link>
			              	</Menu.Item>
			              	<Menu.Item key='9'>
			              		<Link to='/configuracion/centros-costo'>
						        	Centros de Costos
						      	</Link>
			              	</Menu.Item>
			              	<Menu.Item key='10'>
			              		<Link to='/configuracion/perfiles'>
						        	Perfiles
						      	</Link>
			              	</Menu.Item>
			            </SubMenu>
			            <SubMenu key='sub3.2' title='Gestión documentaria'>
			              	<Menu.Item key='11'>
			              		<Link to='/gestion/simbolos-conversiones'>
						       		Símbolos y conversiones
						      	</Link>
			              	</Menu.Item>
			              	<Menu.Item key='12'>
			              		<Link to='/dashboard'>
						        	Periodos y alertas
						      	</Link>
			              	</Menu.Item>
			              	<Menu.Item key='13'>
			              		<Link to='/gestion/tipos-documentos'>
						        	Tipos de documentos
						      	</Link>
			              	</Menu.Item>
			              	<Menu.Item key='15'>
			              		<Link to='/dashboard'>
						        	Reemplazo de usuarios
						      	</Link>
			              	</Menu.Item>
			            </SubMenu>
		          	</SubMenu>
	        	</Menu>
	        </Sider>
		</React.Fragment>
 	);
}

MainLayout.propTypes = {};

MainLayout.defaultProps = {
  menuActive: '',
};

const mapDispatchToProps = dispatch => {
	return {
		closeSesion: data => dispatch(closeSesion(data)),
	}
};

export default connect(null, mapDispatchToProps)(MainLayout);
