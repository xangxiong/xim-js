import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Dropdown, Item, Menu } from 'semantic-ui-react';

export default [
	<Menu.Item as={Link} key="admin.1" to="/inv/data-structures/">
		<Icon name="code" />
		Data Structures
	</Menu.Item>,
	<Menu.Header key="inv">Inventory</Menu.Header>
];