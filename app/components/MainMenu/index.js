/**
 *
 * MainMenu
 *
 */

import React from 'react';
import { Menu, Form, Input, Button, Card, Avatar, Badge } from 'antd';
import { connect } from 'react-redux';
import {
	UserOutlined,
	SearchOutlined,
	BellOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined
} from '@ant-design/icons';
import { closeSesion } from '../../containers/App/actions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.css';

const { SubMenu } = Menu;
const { Meta } = Card;

const MainMenu = (props) => {
	const handleMenuToggle = () => {
		props.onMenuToggle();
	};

	return (
	    <React.Fragment>
			<div className='menu-main'>
				<Button type='primary' className='buttonMenuToggle' icon={props.menuToggle ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={handleMenuToggle} />
				<Menu mode='horizontal' style={{float: 'right'}}>
			        <SubMenu icon={<SearchOutlined />} key='1'>
			        	<Menu.Item key='1'>
			            	<Form name='horizontal_search' layout='inline'>
						      	<Form.Item
						        	name='search'
						        	rules={[{ required: true, message: '¡Por favor ingrese el texto!' }]}
						      	>
						        	<Input placeholder='Buscar documentos' />
						      	</Form.Item>
					      	</Form>
			            </Menu.Item>
			        </SubMenu>
			        <SubMenu icon={<Badge count={2}><BellOutlined /></Badge>} key='2'>
			        	<Menu.Item key='2.1' className='ant-menu-notification'>
			            	<Link to='/'>
					        	<Card style={{ width: 320 }}>
						          	<Meta
						            	avatar={
						              		<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
						            	}
						            	title='William recibio un documento'
						            	description='28/08/2020 05:00'
						          	/>
						        </Card>
					      	</Link>
			            </Menu.Item>
			            <Menu.Item key='2.2' className='ant-menu-notification'>
			            	<Link to='/'>
					        	<Card style={{ width: 320 }}>
						          	<Meta
						            	avatar={
						              		<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
						            	}
						            	title='Augusto te ha compartido algunos documentos'
						            	description='28/08/2020 20:00'
						          	/>
						        </Card>
					      	</Link>
			            </Menu.Item>
			        </SubMenu>
			        <SubMenu icon={<UserOutlined />} title='Admin' key='3'>
			        	<Menu.Item key='3'>
			            	<Link to='/'>
					        	Perfil
					      	</Link>
			            </Menu.Item>
			            <Menu.Item key='4'>
			            	<Link to='/'>
					       		Salir
					      	</Link>
			            </Menu.Item>
			        </SubMenu>
		      	</Menu>
			</div>
		</React.Fragment>
 	);
}

MainMenu.propTypes = {};

MainMenu.defaultProps = {
  menuActive: '',
};

const mapDispatchToProps = dispatch => {
	return {
		closeSesion: data => dispatch(closeSesion(data)),
	}
};

export default connect(null, mapDispatchToProps)(MainMenu);
