import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Icon, Sidebar, Dropdown, Item, Menu } from 'semantic-ui-react';
import logo from '../../../images/logo-dark.png';

class TopMenu extends React.Component {
	render() {
		return (
			<Sidebar className="menu inverted" animation="overlay" direction="top" visible>
				<Item as="a" className="header">
					<img src={logo} className="logo" />
					<div className="space left">XIM</div>
				</Item>
				<Item as="a">
					<Icon name="sidebar" />
				</Item>
				<Menu.Menu position="right">
					<Dropdown item text="Xang">
						<Dropdown.Menu>
							<Dropdown.Item as="a" icon="lock" text="Logout" />
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Menu>
			</Sidebar>
		);
	}
}

export default TopMenu;