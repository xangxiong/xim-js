import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Icon, Sidebar, Dropdown, Item, Menu, Divider } from 'semantic-ui-react';
import menus from '../../../menus';

class LeftMenu extends React.Component {
	buildMenu(menus) {
		let need_divider = false;
		
		let arr_menus = Object.keys(menus).map((key) => {
			let menu = menus[key];
			let submenus = [];
			
			if (menu.child) {
				if (need_divider) {
					submenus.push(<Divider key={menu.key + '_divider'} />);
				}
				
				need_divider = true;
				
				submenus.push(menu.header);
				submenus.push(
					<Menu.Menu key={menu.key + '_menu'}>
						{this.buildMenu(menu.child)}
					</Menu.Menu>
				);
			} else if (menu.header) {
				if (need_divider) {
					submenus.push(<Divider key={menu.key + '_divider'} />);
				}
				
				need_divider = true;
				
				submenus.push(menu.header);
			} else {
				submenus.push(menu);
			}
			
			return submenus;
		});
		
		return [].concat.apply([], arr_menus);
	}
	
	render() {
		return (
			<Sidebar className="menu vertical" animation="overlay" direction="left" visible>
				<div style={{height: '45px'}} />
				<Item>
					{this.buildMenu(menus)}
				</Item>
			</Sidebar>
		);
	}
}

export default LeftMenu;