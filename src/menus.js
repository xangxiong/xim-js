import React from 'react';
import { Icon, Sidebar, Item, Menu } from 'semantic-ui-react';
import AppMenus from './modules/app/menus';
import AuthMenus from './modules/auth/menus';
import InvMenus from './modules/inv/menus';

let module_menus = [].concat(AppMenus, AuthMenus, InvMenus);
let menus = {};
let jsx_menus = [];

/**
 * compares the attribute key assigned to each menu first, and use the sort attribute to compare the tie breaker
 * */
module_menus.sort(function(a, b) {
	const akey = a.key || '';
	const bkey = b.key || '';
	
	if (akey > bkey) {
		return 1;
	} else if (akey < bkey) {
		return -1;
	} else {
		return 0;
	}
});

/** build a multi-dimensional hashmap to organize the menu into its hierarchical classification
 *	admin
 *		menu1
 *		menu2
 *		security
 *			menu3
 *	*/
module_menus.forEach(function(menu) {
	const key = menu.key;
	const keyparts = key.split('.');
	let startmenus = menus;
	let is_child = false;
	
	keyparts.forEach(function(part, i) {
		if (i == (keyparts.length - 1) && part.match(/^[0-9]+$/)) {
			is_child = true;
			return;
		}
		
		if (!startmenus[part]) {
			startmenus[part] = {};
		}
		
		startmenus = startmenus[part];
	});
	
	if (is_child) {
		if (startmenus['child']) {
			startmenus['child'].push(menu);
		} else {
			startmenus['child'] = [menu];
		}
	} else {
		startmenus['header'] = menu;
	}
});

export default menus;