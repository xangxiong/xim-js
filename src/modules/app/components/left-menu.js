import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Icon, Sidebar, Dropdown, Item, Menu } from 'semantic-ui-react';
import menus from '../menus';

class LeftMenu extends React.Component {
	constructor(props) {
		super(props);
		
		// build the menu
		// TODO: working here, take the array of menu and build a multi-dim object using the key of each
		// component and breaking the dot-notation
		//	ex. <span key="admin.main">menu</span>
		// 		{ admin: { main: '<span key="admin.main">menu</span>' } }
	}
	
	render() {
		return (
			<Sidebar className="menu" animation="overlay" direction="left" visible>
				{this._menus}
			</Sidebar>
		);
	}
}

export default LeftMenu;