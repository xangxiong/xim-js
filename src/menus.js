import React from 'react';
import { Icon, Sidebar, Item, Menu } from 'semantic-ui-react';
import AppMenus from './modules/app/menus';
import AuthMenus from './modules/auth/menus';

export default [].concat(AppMenus, AuthMenus);