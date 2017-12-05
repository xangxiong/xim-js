import React from 'react';
import PropTypes from 'prop-types';
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
					<Dropdown item text={this.props.user.first_name}>
						<Dropdown.Menu>
							<Dropdown.Item as={Link} icon="lock" text="Logout" to="/logout" />
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Menu>
			</Sidebar>
		);
	}
}

TopMenu.propTypes = {
	user: PropTypes.object.isRequired
};

export default TopMenu;